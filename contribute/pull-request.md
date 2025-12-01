# Create a pull request

## Your first pull request in open-source

If this is your first contribution to an open-source project on GitHub, be sure to read the article about [creating pull requests](https://help.github.com/en/articles/creating-a-pull-request).

To increase the chances of your pull request being merged, make sure the pull request follows this guideline:

- The pull request title and description match the implementation
- The pull request closes at least one related issue
- The pull request contains tests for new functionality or for the fixed bug

## Pull request formatting

### Pull request title

Write the pull request title in accordance with [Conventional Commits](https://www.conventionalcommits.org).

A couple of examples:

Fix styles for the clear button of the `TextInput` component:

```
fix(TextInput): fix clear button styles
```

Adding a new prop to the `Button` component:

```
feat(Button): add <property-name> property
```

Clarifying documentation for the `Select` component:

```
docs(Select): improve styling section description
```

### Pull request description

In the pull request description, you should specify the related issue and, if necessary, provide additional description if it is required to supplement the information that is already in the related issue.

If this is your first pull request to `@gravity-ui/uikit`, then you need to familiarize yourself with the [CLA](https://github.com/gravity-ui/uikit/blob/main/CONTRIBUTING.md) and add information about consent at the end of the pull request description (more details [here](https://github.com/gravity-ui/uikit/blob/main/CONTRIBUTING.md#provide-contributions)).

## Code review

The `@gravity-ui/uikit` repository uses a [code owners system](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), which means automatic calling of all developers responsible for the code immediately after creating a pull request. It is necessary to get approval from all codeowners called to the pull request. After receiving all necessary approvals, the pull request will be merged by one of the codeowners, and its changes will be included in the next release of the library.
