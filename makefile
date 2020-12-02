publish:
	git stash && git checkout master && git pull && yarn build && npm publish