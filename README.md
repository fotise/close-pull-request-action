# approve-pull-request-action

A GitHub Action for close pull requests.

## Usage

```yaml
steps:
  - name: Close Pull Request
    uses: fotise/close-pull-request-action
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      number: 1
```

## Related

- [find-pull-request-action](https://github.com/juliangruber/find-pull-request-action) &mdash; Find a Pull Request
- [merge-pull-request-action](https://github.com/juliangruber/merge-pull-request-action) &mdash; Merge a Pull Request
- [octokit-action](https://github.com/juliangruber/octokit-action) &mdash; Generic Octokit.js Action

## License

MIT
