NODE := node --experimental-modules --no-warnings
TOOLS := ./tools

# CSS ビルド用パラメータ
CSS := ./public/css/style.css
CSS_SRC_BASE := ./src/css
BUILD_CSS_SCRIPT := $(TOOLS)/buildcss.mjs
CSS_SRC = $(CSS_SRC_BASE)/base.css $(CSS_SRC_BASE)/include/*.css $(BUILD_CSS_SCRIPT)
BUILD_CSS = $(NODE) $(BUILD_CSS_SCRIPT) $< $@

# JSのバンドル用パラメータ
JS = ./public/js/bundle.js
BUNDLE_JS = rollup -i ./src/js/bundle.js -f es -o $@ -p @rollup/plugin-node-resolve 
JS_SRC = ./src/js/*.js

.PHONY:all
all:$(CSS)

# CSSのビルド
$(CSS): $(CSS_SRC)
	@$(BUILD_CSS)

$(JS): $(JS_SRC)
	$(BUNDLE_JS)

# JSのバンドル

.PHONY: clean
clean:
	rm -f $(CSS)