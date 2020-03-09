NODE := node --experimental-modules
TOOLS := ./tools

# riotのバンドル用パラメータ
RIOT_SRC = $(wildcard ./src/riot/*.riot)

# CSS ビルド用パラメータ
CSS := ./public/css/style.css
CSS_SRC_BASE := ./src/css
BUILD_CSS_SCRIPT := $(TOOLS)/buildcss.mjs
CSS_SRC := $(CSS_SRC_BASE)/style.css $(wildcard $(CSS_SRC_BASE)/include/*.css) $(BUILD_CSS_SCRIPT) $(wildcard ./public/html/*.html) $(wildcard ./public/js/*.js) $(RIOT_SRC)
BUILD_CSS = $(NODE) $(BUILD_CSS_SCRIPT) $< $@

# JSのバンドル用パラメータ
JS := ./public/js/bundle.mjs
JS_SRC := $(wildcard ./src/js/*.js) $(wildcard ./src/js/*.mjs)  
BUNDLE_JS = rollup -c  

# ejsのビルド用パラメータ
EJS := ./public/html/index.html
EJS_SRC := ./src/ejs/index.ejs $(wildcard ./src/ejs/*.ejs)
#BUILD_EJS = ejs-cli --base-dir src/ejs/ 'index.ejs' --out ./public/html/
BUILD_EJS = $(NODE) ./tools/buildEjs.mjs $< $@


.PHONY:all
all:$(JS) $(EJS) $(CSS)

# JSのバンドル
$(JS): $(JS_SRC) $(RIOT_SRC) ./rollup.config.js 
	@$(BUNDLE_JS)

# CSSのビルド
$(CSS): $(CSS_SRC)
	@$(BUILD_CSS)

# EJSのビルド
$(EJS): $(EJS_SRC) 
	$(BUILD_EJS)

.PHONY: clean
clean:
	rm -f $(CSS) $(JS) $(EJS)