
# Meli deploy Github Action
This action makes it easier to work with [Meli](https://docs.meli.sh/) (static website hosting) within GitHub Actions. You can quickly build and deploy new releases or delete branches with their releases.

> As Meli is still in beta, this action is only pre-release, and functionality may change in the future. Tested with [Meli v1.0.0-beta.22](https://github.com/getmeli/meli/releases/tag/v1.0.0-beta.22). Any enhancements or feature requests are welcome!

***

## Examples
**Deploy release on push**: [deploy-branch-preview.yml](./examples/deploy-branch-preview.yml)

**Deploy release on PR**: [deploy-pr-preview.yml](./examples/deploy-pr-preview.yml)

**Remove branch on branch delete / PR closed**: [remove-branch.yml](./examples/remove-branch.yml)

***

## Inputs

### `action`
**Required**<br>
Action to make. Currently, it can be either `release` or `remove`.

### `meliUrl`
**Required**<br>
Base URL of your Meli server (without trailing slash, ie. `https://meli.dvdev.cz`

### `meliSiteId`
**Required**<br>
Site ID of your Meli site

### `meliSiteToken`
**Required** (for `release` action)<br>
Site token of your Meli site
> In the future, there will be the option to use API tokens for release action. See Meli's issue [#216](https://github.com/getmeli/meli/issues/216) for more info.

### `meliApiToken`
**Required** (for `remove` action)<br>
Meli API token with `release_delete`, `site_branch_delete` `site.site_releases_list` and`site.site_branch_list` scope enabled.

### `meliSiteRelease`
Name of release.<br>
Defaults to: `YYYY-MM-DD HH:MM:SS | <branchName> | <commit-SHA>`

### `branchName`
Name of Meli branch.<br>
Defaults to: `<branch>` or `pr-<number-of-pr>`
> - In case of branch push, `branchName` will default to Git branch name as follows:<br>
>   - in case of branch `main`, `branchName` will be `main`
>   - in case of branch `feature/update` (or any other prefixes like `release/*`), `branchName` will be `update` (it takes only the part after the last slash)
> -  In case of a pull request, `branchName` will default to `pr-${pr_number}` (for example, `pr-6` for PR #6)

### `buildFolder`
Folder with files to release. The path is taken from the root of your repository.<br>
Defaults to `dist`.

***

## Outputs
### `meliDeployUrl`
URL of deployed release.
> It wiill be filled only within `release` action.

***

## Example usage
```yml
- name: Deploy static site preview
  uses: digitalvisioncz/meli-deploy-github-action@1.0.0-beta.2
  id: meli
  with:
    action: release
    meliUrl: https://meli.dvdev.cz
    meliSiteId: ${{ secrets.MELI_SITE_ID }}
    meliSiteToken: ${{ secrets.MELI_SITE_TOKEN }}
    buildFolder: out
```
> More examples with comments are in the `examples` folder.
