#!/bin/bash
# Update the gh-pages branch to include content from
# the styleguide folder.

# Dependcies: `awk` and `git`, must be run on a Unix system.

cd "$(dirname $0)";
parent_sha=$(git show-ref -s refs/heads/gh-pages)
doc_sha=$(git ls-tree -d HEAD styleguide | awk '{print $3}')
new_commit=$(echo "Auto-update styleguide." | git commit-tree $doc_sha -p $parent_sha)
git update-ref refs/heads/gh-pages $new_commit
exit;
