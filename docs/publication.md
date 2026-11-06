# Clean publication

The publication target is a new repository, `pm-toolkit-public`. The original `pm-toolkit` stays private with its existing history intact.

The public candidate contains only the current reviewed toolkit files, with a new initial history. It must not import the old repository's `.git` folder, branches, tags, issues, commit ancestry or removed competitor-monitor files. Do not push the old repository's refs into the new one.

## Release gate

1. Run the local tests and documentation checks in validation.md.
2. Check the entire publication file list for secrets, personal details, local paths, internal URLs and customer records, including screenshots.
3. Verify the new repository's history contains only the intended clean initial snapshot and later reviewed changes.
4. Complete or explicitly defer the connected checks in integration-checklist.md. Keep experimental capability labels until connected behaviour has been observed.
5. Verify the final GitHub visibility only after the publication condition is satisfied.

The private original is not sanitized by publishing a clean copy. Its history remains private and continues to hold previously removed project material.
