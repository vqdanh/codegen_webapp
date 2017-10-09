SystemJS.config({
  nodeConfig: {
    'paths': {
      'github:': 'jspm_packages/github/',
      'npm:': 'jspm_packages/npm/',
      'codegen/': 'src/'
    }
  },
  devConfig: {
    'map': {
      'plugin-babel': 'npm:systemjs-plugin-babel@0.0.21',
      'angular-mocks': 'github:angular/bower-angular-mocks@1.5.8',
      'plugin-traceur': 'npm:systemjs-plugin-traceur@0.0.3'
    },
    'packages': {
      'github:angular/bower-angular-mocks@1.5.8': {
        'map': {
          'angular': 'github:angular/bower-angular@1.6.6'
        }
      },
      'npm:systemjs-plugin-traceur@0.0.3': {
        'map': {
          'traceur': 'github:jmcriffey/bower-traceur@0.0.111',
          'traceur-runtime': 'github:jmcriffey/bower-traceur-runtime@0.0.111'
        }
      }
    }
  },
  packages: {
    'codegen': {
      'main': 'codegen.js'
    },
    'src': {
      'defaultExtension': 'js'
    },
    'github:angular/bower-angular-route@1.6.4': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6'
      }
    },
    'github:swimlane/angular-data-table@0.7.0': {
      'map': {
        'angular': 'npm:angular@1.6.6'
      }
    }
  },
  transpiler: 'plugin-traceur',
  meta: {
    '*.css': {
      'loader': 'css'
    }
  },
  map: {
    'angular-data-table': 'github:swimlane/angular-data-table@0.7.0',
    'angular-route': 'github:angular/bower-angular-route@1.6.4',
    'mdPickers': 'github:alenaksu/mdPickers@0.7.5',
    'traceur': 'github:jmcriffey/bower-traceur@0.0.93',
    'traceur-runtime': 'github:jmcriffey/bower-traceur-runtime@0.0.93',
    'urish/angular-spinner': 'github:urish/angular-spinner@1.0.1'
  }
});

SystemJS.config({
  packageConfigPaths: [
    'github:*/*.json',
    'npm:@*/*.json',
    'npm:*.json'
  ],
  map: {
    'angular-spinners': 'npm:angular-spinners@3.1.2',
    '@angular/common': 'npm:@angular/common@4.4.3',
    '@angular/core': 'npm:@angular/core@4.4.3',
    'rxjs': 'npm:rxjs@5.4.3',
    'timers': 'github:jspm/nodelibs-timers@0.2.0-alpha',
    'jqueryui': 'npm:jqueryui@1.11.1',
    'jquery': 'npm:jquery@1.12.4',
    'jsonformatter': 'npm:jsonformatter@0.6.0',
    'angular': 'github:angular/bower-angular@1.6.6',
    'angular-animate': 'github:angular/bower-angular-animate@1.6.5',
    'angular-aria': 'github:angular/bower-angular-aria@1.6.5',
    'angular-clipboard': 'npm:angular-clipboard@1.6.1',
    'angular-cookies': 'github:angular/bower-angular-cookies@1.6.5',
    'angular-file-saver': 'npm:angular-file-saver@1.1.3',
    'angular-highlightjs': 'npm:angular-highlightjs@0.7.1',
    'angular-local-storage': 'npm:angular-local-storage@0.7.1',
    'angular-material': 'github:angular/bower-material@master',
    'angular-material-data-table': 'github:daniel-nagy/md-data-table@0.10.10',
    'angular-material-datetimepicker': 'github:logbon72/angular-material-datetimepicker@1.5.1',
    'angular-material-fileinput': 'github:shuyu/angular-material-fileinput@1.5.2',
    'angular-messages': 'github:angular/bower-angular-messages@1.6.5',
    'angular-resource': 'github:angular/bower-angular-resource@1.6.5',
    'angular-sanitize': 'github:angular/bower-angular-sanitize@1.6.6',
    'angular-ui-router': 'github:angular-ui/angular-ui-router-bower@1.0.5',
    'assert': 'github:jspm/nodelibs-assert@0.2.0-alpha',
    'babel': 'npm:babel-core@6.26.0',
    'buffer': 'github:jspm/nodelibs-buffer@0.2.0-alpha',
    'constants': 'github:jspm/nodelibs-constants@0.2.0-alpha',
    'crypto': 'github:jspm/nodelibs-crypto@0.2.0-alpha',
    'css': 'github:systemjs/plugin-css@0.1.35',
    'events': 'github:jspm/nodelibs-events@0.2.2',
    'fs': 'github:jspm/nodelibs-fs@0.2.0-alpha',
    'js-graph-algorithms': 'npm:js-graph-algorithms@1.0.14',
    'json': 'github:systemjs/plugin-json@0.1.2',
    'jszip': 'npm:jszip@3.1.4',
    'module': 'github:jspm/nodelibs-module@0.2.0-alpha',
    'moment': 'github:moment/moment@2.18.1',
    'ng-redux': 'npm:ng-redux@3.5.2',
    'os': 'github:jspm/nodelibs-os@0.2.2',
    'path': 'github:jspm/nodelibs-path@0.2.3',
    'pluralize': 'npm:pluralize@7.0.0',
    'process': 'github:jspm/nodelibs-process@0.2.0-alpha',
    'split-pane': 'npm:split-pane@0.5.1',
    'split.js': 'npm:split.js@1.3.5',
    'stream': 'github:jspm/nodelibs-stream@0.2.0-alpha',
    'string_decoder': 'github:jspm/nodelibs-string_decoder@0.2.0-alpha',
    'stringify-object': 'npm:stringify-object@3.2.0',
    'text': 'github:systemjs/plugin-text@0.0.4',
    'util': 'github:jspm/nodelibs-util@0.2.0-alpha',
    'vm': 'github:jspm/nodelibs-vm@0.2.0-alpha',
    'zone.js': 'npm:zone.js@0.8.17'
  },
  packages: {
    'npm:babel-core@6.26.0': {
      'map': {
        'json5': 'npm:json5@0.5.1',
        'convert-source-map': 'npm:convert-source-map@1.5.0',
        'minimatch': 'npm:minimatch@3.0.4',
        'path-is-absolute': 'npm:path-is-absolute@1.0.1',
        'babel-generator': 'npm:babel-generator@6.26.0',
        'babel-types': 'npm:babel-types@6.26.0',
        'slash': 'npm:slash@1.0.0',
        'lodash': 'npm:lodash@4.17.4',
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'source-map': 'npm:source-map@0.5.7',
        'babel-messages': 'npm:babel-messages@6.23.0',
        'babel-helpers': 'npm:babel-helpers@6.24.1',
        'babel-code-frame': 'npm:babel-code-frame@6.26.0',
        'babel-register': 'npm:babel-register@6.26.0',
        'babel-traverse': 'npm:babel-traverse@6.26.0',
        'debug': 'npm:debug@2.6.8',
        'babylon': 'npm:babylon@6.18.0',
        'babel-template': 'npm:babel-template@6.26.0',
        'private': 'npm:private@0.1.7'
      }
    },
    'npm:babel-generator@6.26.0': {
      'map': {
        'babel-types': 'npm:babel-types@6.26.0',
        'lodash': 'npm:lodash@4.17.4',
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'source-map': 'npm:source-map@0.5.7',
        'babel-messages': 'npm:babel-messages@6.23.0',
        'detect-indent': 'npm:detect-indent@4.0.0',
        'trim-right': 'npm:trim-right@1.0.1',
        'jsesc': 'npm:jsesc@1.3.0'
      }
    },
    'npm:babel-types@6.26.0': {
      'map': {
        'lodash': 'npm:lodash@4.17.4',
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'to-fast-properties': 'npm:to-fast-properties@1.0.3',
        'esutils': 'npm:esutils@2.0.2'
      }
    },
    'npm:babel-messages@6.23.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.26.0'
      }
    },
    'npm:babel-helpers@6.24.1': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'babel-template': 'npm:babel-template@6.26.0'
      }
    },
    'npm:babel-register@6.26.0': {
      'map': {
        'babel-core': 'npm:babel-core@6.26.0',
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'lodash': 'npm:lodash@4.17.4',
        'core-js': 'npm:core-js@2.5.1',
        'home-or-tmp': 'npm:home-or-tmp@2.0.0',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'source-map-support': 'npm:source-map-support@0.4.18'
      }
    },
    'npm:babel-traverse@6.26.0': {
      'map': {
        'babel-code-frame': 'npm:babel-code-frame@6.26.0',
        'babel-messages': 'npm:babel-messages@6.23.0',
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'babel-types': 'npm:babel-types@6.26.0',
        'debug': 'npm:debug@2.6.8',
        'lodash': 'npm:lodash@4.17.4',
        'babylon': 'npm:babylon@6.18.0',
        'invariant': 'npm:invariant@2.2.2',
        'globals': 'npm:globals@9.18.0'
      }
    },
    'npm:babel-template@6.26.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'babel-traverse': 'npm:babel-traverse@6.26.0',
        'babel-types': 'npm:babel-types@6.26.0',
        'babylon': 'npm:babylon@6.18.0',
        'lodash': 'npm:lodash@4.17.4'
      }
    },
    'npm:minimatch@3.0.4': {
      'map': {
        'brace-expansion': 'npm:brace-expansion@1.1.8'
      }
    },
    'npm:babel-code-frame@6.26.0': {
      'map': {
        'esutils': 'npm:esutils@2.0.2',
        'js-tokens': 'npm:js-tokens@3.0.2',
        'chalk': 'npm:chalk@1.1.3'
      }
    },
    'npm:babel-runtime@6.26.0': {
      'map': {
        'regenerator-runtime': 'npm:regenerator-runtime@0.11.0',
        'core-js': 'npm:core-js@2.5.1'
      }
    },
    'npm:brace-expansion@1.1.8': {
      'map': {
        'concat-map': 'npm:concat-map@0.0.1',
        'balanced-match': 'npm:balanced-match@1.0.0'
      }
    },
    'npm:detect-indent@4.0.0': {
      'map': {
        'repeating': 'npm:repeating@2.0.1'
      }
    },
    'npm:source-map-support@0.4.18': {
      'map': {
        'source-map': 'npm:source-map@0.5.7'
      }
    },
    'npm:home-or-tmp@2.0.0': {
      'map': {
        'os-homedir': 'npm:os-homedir@1.0.2',
        'os-tmpdir': 'npm:os-tmpdir@1.0.2'
      }
    },
    'npm:invariant@2.2.2': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.1'
      }
    },
    'npm:loose-envify@1.3.1': {
      'map': {
        'js-tokens': 'npm:js-tokens@3.0.2'
      }
    },
    'npm:mkdirp@0.5.1': {
      'map': {
        'minimist': 'npm:minimist@0.0.8'
      }
    },
    'npm:debug@2.6.8': {
      'map': {
        'ms': 'npm:ms@2.0.0'
      }
    },
    'npm:chalk@1.1.3': {
      'map': {
        'escape-string-regexp': 'npm:escape-string-regexp@1.0.5',
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'has-ansi': 'npm:has-ansi@2.0.0',
        'ansi-styles': 'npm:ansi-styles@2.2.1',
        'supports-color': 'npm:supports-color@2.0.0'
      }
    },
    'npm:repeating@2.0.1': {
      'map': {
        'is-finite': 'npm:is-finite@1.0.2'
      }
    },
    'npm:is-finite@1.0.2': {
      'map': {
        'number-is-nan': 'npm:number-is-nan@1.0.1'
      }
    },
    'npm:strip-ansi@3.0.1': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.1.1'
      }
    },
    'npm:has-ansi@2.0.0': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.1.1'
      }
    },
    'github:jspm/nodelibs-buffer@0.2.0-alpha': {
      'map': {
        'buffer-browserify': 'npm:buffer@4.9.1'
      }
    },
    'github:jspm/nodelibs-stream@0.2.0-alpha': {
      'map': {
        'stream-browserify': 'npm:stream-browserify@2.0.1'
      }
    },
    'npm:buffer@4.9.1': {
      'map': {
        'ieee754': 'npm:ieee754@1.1.8',
        'isarray': 'npm:isarray@1.0.0',
        'base64-js': 'npm:base64-js@1.2.1'
      }
    },
    'npm:stream-browserify@2.0.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'readable-stream': 'npm:readable-stream@2.3.3'
      }
    },
    'npm:readable-stream@2.3.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'isarray': 'npm:isarray@1.0.0',
        'string_decoder': 'npm:string_decoder@1.0.3',
        'safe-buffer': 'npm:safe-buffer@5.1.1',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'util-deprecate': 'npm:util-deprecate@1.0.2',
        'core-util-is': 'npm:core-util-is@1.0.2'
      }
    },
    'npm:string_decoder@1.0.3': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    },
    'github:jspm/nodelibs-crypto@0.2.0-alpha': {
      'map': {
        'crypto-browserify': 'npm:crypto-browserify@3.11.1'
      }
    },
    'npm:crypto-browserify@3.11.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'browserify-cipher': 'npm:browserify-cipher@1.0.0',
        'create-ecdh': 'npm:create-ecdh@4.0.0',
        'diffie-hellman': 'npm:diffie-hellman@5.0.2',
        'browserify-sign': 'npm:browserify-sign@4.0.4',
        'randombytes': 'npm:randombytes@2.0.5',
        'pbkdf2': 'npm:pbkdf2@3.0.14',
        'create-hmac': 'npm:create-hmac@1.1.6',
        'create-hash': 'npm:create-hash@1.1.3',
        'public-encrypt': 'npm:public-encrypt@4.0.0'
      }
    },
    'npm:browserify-sign@4.0.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'create-hmac': 'npm:create-hmac@1.1.6',
        'create-hash': 'npm:create-hash@1.1.3',
        'bn.js': 'npm:bn.js@4.11.8',
        'elliptic': 'npm:elliptic@6.4.0',
        'parse-asn1': 'npm:parse-asn1@5.1.0',
        'browserify-rsa': 'npm:browserify-rsa@4.0.1'
      }
    },
    'npm:diffie-hellman@5.0.2': {
      'map': {
        'randombytes': 'npm:randombytes@2.0.5',
        'bn.js': 'npm:bn.js@4.11.8',
        'miller-rabin': 'npm:miller-rabin@4.0.0'
      }
    },
    'npm:randombytes@2.0.5': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    },
    'npm:pbkdf2@3.0.14': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.1.1',
        'create-hmac': 'npm:create-hmac@1.1.6',
        'create-hash': 'npm:create-hash@1.1.3',
        'sha.js': 'npm:sha.js@2.4.8',
        'ripemd160': 'npm:ripemd160@2.0.1'
      }
    },
    'npm:create-hmac@1.1.6': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'safe-buffer': 'npm:safe-buffer@5.1.1',
        'create-hash': 'npm:create-hash@1.1.3',
        'sha.js': 'npm:sha.js@2.4.8',
        'cipher-base': 'npm:cipher-base@1.0.4',
        'ripemd160': 'npm:ripemd160@2.0.1'
      }
    },
    'npm:create-hash@1.1.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'sha.js': 'npm:sha.js@2.4.8',
        'cipher-base': 'npm:cipher-base@1.0.4',
        'ripemd160': 'npm:ripemd160@2.0.1'
      }
    },
    'npm:public-encrypt@4.0.0': {
      'map': {
        'create-hash': 'npm:create-hash@1.1.3',
        'randombytes': 'npm:randombytes@2.0.5',
        'bn.js': 'npm:bn.js@4.11.8',
        'parse-asn1': 'npm:parse-asn1@5.1.0',
        'browserify-rsa': 'npm:browserify-rsa@4.0.1'
      }
    },
    'npm:browserify-cipher@1.0.0': {
      'map': {
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.3',
        'browserify-aes': 'npm:browserify-aes@1.0.8',
        'browserify-des': 'npm:browserify-des@1.0.0'
      }
    },
    'npm:evp_bytestokey@1.0.3': {
      'map': {
        'safe-buffer': 'npm:safe-buffer@5.1.1',
        'md5.js': 'npm:md5.js@1.3.4'
      }
    },
    'npm:create-ecdh@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.8',
        'elliptic': 'npm:elliptic@6.4.0'
      }
    },
    'npm:browserify-aes@1.0.8': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'safe-buffer': 'npm:safe-buffer@5.1.1',
        'create-hash': 'npm:create-hash@1.1.3',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.3',
        'cipher-base': 'npm:cipher-base@1.0.4',
        'buffer-xor': 'npm:buffer-xor@1.0.3'
      }
    },
    'npm:elliptic@6.4.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'bn.js': 'npm:bn.js@4.11.8',
        'brorand': 'npm:brorand@1.1.0',
        'minimalistic-crypto-utils': 'npm:minimalistic-crypto-utils@1.0.1',
        'hmac-drbg': 'npm:hmac-drbg@1.0.1',
        'hash.js': 'npm:hash.js@1.1.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:parse-asn1@5.1.0': {
      'map': {
        'pbkdf2': 'npm:pbkdf2@3.0.14',
        'browserify-aes': 'npm:browserify-aes@1.0.8',
        'create-hash': 'npm:create-hash@1.1.3',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.3',
        'asn1.js': 'npm:asn1.js@4.9.1'
      }
    },
    'npm:miller-rabin@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.8',
        'brorand': 'npm:brorand@1.1.0'
      }
    },
    'npm:browserify-des@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'cipher-base': 'npm:cipher-base@1.0.4',
        'des.js': 'npm:des.js@1.0.0'
      }
    },
    'npm:sha.js@2.4.8': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:cipher-base@1.0.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    },
    'npm:ripemd160@2.0.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'hash-base': 'npm:hash-base@2.0.2'
      }
    },
    'npm:browserify-rsa@4.0.1': {
      'map': {
        'randombytes': 'npm:randombytes@2.0.5',
        'bn.js': 'npm:bn.js@4.11.8'
      }
    },
    'npm:md5.js@1.3.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'hash-base': 'npm:hash-base@3.0.4'
      }
    },
    'npm:hmac-drbg@1.0.1': {
      'map': {
        'minimalistic-crypto-utils': 'npm:minimalistic-crypto-utils@1.0.1',
        'hash.js': 'npm:hash.js@1.1.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:hash.js@1.1.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:des.js@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:asn1.js@4.9.1': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.8',
        'inherits': 'npm:inherits@2.0.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:hash-base@3.0.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'safe-buffer': 'npm:safe-buffer@5.1.1'
      }
    },
    'npm:hash-base@2.0.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'github:jspm/nodelibs-string_decoder@0.2.0-alpha': {
      'map': {
        'string_decoder-browserify': 'npm:string_decoder@0.10.31'
      }
    },
    'github:angular/bower-angular-animate@1.6.5': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6'
      }
    },
    'github:angular/bower-angular-aria@1.6.5': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6'
      }
    },
    'github:angular/bower-angular-cookies@1.6.5': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6'
      }
    },
    'github:angular/bower-angular-messages@1.6.5': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6'
      }
    },
    'github:angular/bower-angular-resource@1.6.5': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6'
      }
    },
    'github:angular/bower-angular-sanitize@1.6.6': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6'
      }
    },
    'github:angular/bower-material@master': {
      'map': {
        'angular': 'github:angular/bower-angular@1.6.6',
        'angular-animate': 'github:angular/bower-angular-animate@1.6.5',
        'angular-aria': 'github:angular/bower-angular-aria@1.6.5',
        'angular-messages': 'github:angular/bower-angular-messages@1.6.5',
        'css': 'github:systemjs/plugin-css@0.1.35'
      }
    },
    'npm:angular-clipboard@1.6.1': {
      'map': {
        'angular': 'npm:angular@1.6.6'
      }
    },
    'npm:angular-file-saver@1.1.3': {
      'map': {
        'blob-tmp': 'npm:blob-tmp@1.0.0',
        'file-saver': 'npm:file-saver@1.3.3'
      }
    },
    'npm:angular-highlightjs@0.7.1': {
      'map': {
        'angular': 'npm:angular@1.6.6',
        'highlight.js': 'npm:highlight.js@9.12.0'
      }
    },
    'npm:core-js@2.3.0': {
      'map': {
        'systemjs-json': 'github:systemjs/plugin-json@0.1.2'
      }
    },
    'npm:core-js@2.5.1': {
      'map': {
        'systemjs-json': 'github:systemjs/plugin-json@0.1.2'
      }
    },
    'npm:core-util-is@1.0.2': {
      'map': {}
    },
    'npm:es6-promise@3.0.2': {
      'map': {}
    },
    'npm:highlight.js@9.12.0': {
      'map': {}
    },
    'npm:immediate@3.0.6': {
      'map': {}
    },
    'npm:js-graph-algorithms@1.0.14': {
      'map': {}
    },
    'npm:jszip@3.1.4': {
      'map': {
        'core-js': 'npm:core-js@2.3.0',
        'es6-promise': 'npm:es6-promise@3.0.2',
        'lie': 'npm:lie@3.1.1',
        'pako': 'npm:pako@1.0.5',
        'readable-stream': 'npm:readable-stream@2.0.6',
        'node-readable-stream': 'npm:readable-stream@2.0.6'
      }
    },
    'npm:lie@3.1.1': {
      'map': {
        'immediate': 'npm:immediate@3.0.6'
      }
    },
    'npm:lodash.curry@4.1.1': {
      'map': {}
    },
    'npm:lodash.map@4.6.0': {
      'map': {}
    },
    'npm:ng-redux@3.5.2': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.26.0',
        'invariant': 'npm:invariant@2.2.2',
        'lodash.curry': 'npm:lodash.curry@4.1.1',
        'lodash.isfunction': 'npm:lodash.isfunction@3.0.8',
        'lodash.isobject': 'npm:lodash.isobject@3.0.2',
        'lodash.isplainobject': 'npm:lodash.isplainobject@4.0.6',
        'lodash.map': 'npm:lodash.map@4.6.0',
        'redux': 'npm:redux@3.7.2'
      }
    },
    'npm:pako@1.0.5': {
      'map': {}
    },
    'npm:redux@3.7.2': {
      'map': {
        'lodash': 'npm:lodash@4.17.4',
        'lodash-es': 'npm:lodash-es@4.17.4',
        'loose-envify': 'npm:loose-envify@1.3.1',
        'symbol-observable': 'npm:symbol-observable@1.0.4'
      }
    },
    'npm:regenerator-runtime@0.11.0': {
      'map': {}
    },
    'npm:string_decoder@0.10.31': {
      'map': {}
    },
    'npm:stringify-object@3.2.0': {
      'map': {
        'get-own-enumerable-property-symbols': 'npm:get-own-enumerable-property-symbols@1.0.1',
        'is-obj': 'npm:is-obj@1.0.1',
        'is-regexp': 'npm:is-regexp@1.0.0'
      }
    },
    'npm:readable-stream@2.0.6': {
      'map': {
        'core-util-is': 'npm:core-util-is@1.0.2',
        'inherits': 'npm:inherits@2.0.3',
        'isarray': 'npm:isarray@1.0.0',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'string_decoder': 'npm:string_decoder@0.10.31',
        'util-deprecate': 'npm:util-deprecate@1.0.2'
      }
    },
    'npm:rxjs@5.4.3': {
      'map': {
        'symbol-observable': 'npm:symbol-observable@1.0.4'
      }
    },
    'npm:@angular/common@4.4.3': {
      'map': {
        'tslib': 'npm:tslib@1.7.1'
      }
    },
    'npm:@angular/core@4.4.3': {
      'map': {
        'tslib': 'npm:tslib@1.7.1'
      }
    },
    'github:jspm/nodelibs-timers@0.2.0-alpha': {
      'map': {
        'timers-browserify': 'npm:timers-browserify@1.4.2'
      }
    },
    'npm:timers-browserify@1.4.2': {
      'map': {
        'process': 'npm:process@0.11.10'
      }
    }
  }
});
