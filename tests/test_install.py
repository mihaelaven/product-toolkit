"""Installer checks use temporary directories; never touch the user's skills."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / 'scripts/install-skills.py'

class InstallTests(unittest.TestCase):
    def run_installer(self, destination, *args):
        return subprocess.run([sys.executable, str(SCRIPT), '--destination', str(destination), *args],
                              capture_output=True, text=True)

    def test_all_skills_keep_examples(self):
        with tempfile.TemporaryDirectory() as temp:
            dest = Path(temp)
            result = self.run_installer(dest, '--all')
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(len(list(dest.glob('*/SKILL.md'))), 6)
            self.assertEqual({p.parent.name for p in dest.glob('*/SKILL.md')}, {
                'prd', 'client-validation-analysis', 'feature-request-triage',
                'linear-task-creation', 'pm-vault', 'content-guidelines'})
            self.assertTrue((dest/'content-guidelines/examples/example-brand.md').is_file())
            self.assertFalse((dest/'README.md').exists())

    def test_existing_install_is_preserved_until_overwrite(self):
        with tempfile.TemporaryDirectory() as temp:
            dest = Path(temp)
            self.assertEqual(self.run_installer(dest, 'prd').returncode, 0)
            skill = dest/'prd/SKILL.md'
            skill.write_text('personal edit')
            self.assertNotEqual(self.run_installer(dest, 'prd', 'pm-vault').returncode, 0)
            self.assertEqual(skill.read_text(), 'personal edit')
            self.assertFalse((dest/'pm-vault').exists())
            self.assertEqual(self.run_installer(dest, 'prd', '--overwrite').returncode, 0)
            self.assertEqual(skill.read_bytes(), (ROOT/'skills/prd/SKILL.md').read_bytes())

    def test_unknown_name_and_source_destination_are_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            for name in ('../prd', 'call-task-hub', 'capacity-timeline-planner'):
                self.assertNotEqual(self.run_installer(Path(temp), name).returncode, 0)
            self.assertEqual(list(Path(temp).iterdir()), [])
        self.assertNotEqual(self.run_installer(ROOT/'skills', 'prd', '--overwrite').returncode, 0)

if __name__ == '__main__':
    unittest.main()

