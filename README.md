# sync-env

This is the README for ["sync-env"](https://marketplace.visualstudio.com/items?itemName=dongido.sync-env) which helps you keep your `.env` file in sync with your `env.example` file. Once you have installed the `sync-env` extension, it will begin synchronizing any `.env` and `.env.example` files found in your project root folder. It also works with sub folders.

## Install

Download and install it from the vs-code market [here](https://marketplace.visualstudio.com/items?itemName=dongido.sync-env)

![Sync Env Demo](./images/sync-env.gif)

## Uses

The extension is activated automatically by default when it is first installed. In case you have deactivated it before, you can activate it using by:

1. Shift + Command + P
2. Type into the command pallet - `Activate Watchers` to bring out the command, then click on it.

![Sync Env Demo](./images/activate.png)

To deactivate the extension:

1. Shift + Command + P
2. Type into the command pallet - `Deactivate Watchers` to bring out the command, then click on it to deactivate the extension.

![Sync Env Demo](./images/deactivate.png)


# CHANGELOG

Notable changes:

## [1.0.3] - 2019-04-10

### Added
- Added basics for writing tests
- Provided provision for customising .env files
- Prompt to copy content of watched files for created config file.
### Changed
- Refactored code
### Removed

## [1.0.4] - 2019-09-27

### Added
- Added extension activation command
- Added extension deactivation command
- [Env variable](https://github.com/dongido001/vscode-sync-env/issues/3) can now be synced!
- [Comments](https://github.com/dongido001/vscode-sync-env/issues/2) are now respected - 
### Changed
- Refactored code to allow activating and deactivating the extension
### Removed

## BUG AND FEATURE REQUEST
Please, open an [issue on GitHub](https://github.com/dongido001/vscode-sync-env/issues) if you want to report a bug or you thought of a good feature to have. 

Contribution is always wellcomed!

## TODO

- Allow users to set the files they want to sync
- Allow disabling sync in a given folder (Still need to consider if it's worth it)
- ...And other requested features
