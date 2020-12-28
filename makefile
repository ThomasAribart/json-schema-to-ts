publish:
	git stash && git checkout master && git pull && yarn test && yarn build && npm publish