'use strict;'
export default [StringUtilsFactory];

function StringUtilsFactory() {

	/**
   * Represents a failed index search.
   */
  const INDEX_NOT_FOUND = -1;
  /**
   * The empty String <code>""</code>.
   */
  const EMPTY = "";
  /**
   * <p>The maximum size to which the padding constant(s) can expand.</p>
   */
  const PAD_LIMIT = 8192;

  let StringUtils = {
  	isEmpty: isEmpty,
		isNotEmpty: isNotEmpty,
		isBlank: isBlank,
		isNotBlank: isNotBlank,
		clean: clean,
		trim: trim,
		trimToNull: trimToNull,
		trimToEmpty: trimToEmpty,
		replace: replace,
		lowerCase: lowerCase,
		upperCase: upperCase,
		camelCase: camelCase,
		unCamelCase: unCamelCase,
		properCase: properCase,
		pascalCase: pascalCase,
		normalizeLineBreaks: normalizeLineBreaks,
		sentenceCase: sentenceCase,
		slugify: slugify,
		hyphenate: hyphenate,
		unhyphenate: unhyphenate,
		underscore: underscore,
		removeNonWord: removeNonWord,
		normalizeLineBreaks: normalizeLineBreaks,
		replaceAccents: replaceAccents,
		contains: contains,
		crop: crop,
		escapeRegExp: escapeRegExp,
		escapeHtml: escapeHtml,
		unescapeHtml: unescapeHtml,
		escapeUnicode: escapeUnicode,
		stripHtmlTags: stripHtmlTags,
		removeNonASCII: removeNonASCII,
		interpolate: interpolate,
		rpad: rpad,
		lpad: lpad,
		repeat: repeat,
		truncate: truncate,
		ltrim: ltrim,
		rtrim: rtrim,
		abbreviate: abbreviate
  };
  return StringUtils;
  
  function getConstant(){
  	console.log('INDEX_NOT_FOUND', INDEX_NOT_FOUND);

  }

  /**
   * <p>Checks if a String is empty ("") or null.</p>
   *
   * <pre>
   * isEmpty(null)      = true
   * isEmpty("")        = true
   * isEmpty(" ")       = false
   * isEmpty("bob")     = false
   * isEmpty("  bob  ") = false
   * </pre>
   *
   * It no longer trims the String.
   * That functionality is available in isBlank().</p>
   *
   * @param str  the String to check, may be null
   * @return <code>true</code> if the String is empty or null
   */
  function isEmpty(str) {
      return str === null || str === undefined || str.length === 0;
  };
  /**
   * <p>Checks if a String is not empty ("") and not null.</p>
   *
   * <pre>
   * isNotEmpty(null)      = false
   * isNotEmpty("")        = false
   * isNotEmpty(" ")       = true
   * isNotEmpty("bob")     = true
   * isNotEmpty("  bob  ") = true
   * </pre>
   *
   * @param str  the String to check, may be null
   * @return <code>true</code> if the String is not empty and not null
   */
  function isNotEmpty(str) {
      return !isEmpty(str);
  };
  /**
   * <p>Checks if a String is whitespace, empty ("") or null.</p>
   *
   * <pre>
   * isBlank(null)      = true
   * isBlank("")        = true
   * isBlank(" ")       = true
   * isBlank("bob")     = false
   * isBlank("  bob  ") = false
   * </pre>
   *
   * @param str  the String to check, may be null
   * @return <code>true</code> if the String is null, empty or whitespace
   * @since 2.0
   */
  function isBlank(str) {
      var strLen;
      if (str == null || (strLen = str.length) === 0) {
          return true;
      }
      for (var i = 0; i < strLen; i++) {
          if (str[i] !== '' && str[i] !== ' ' && str[i] !== '\n' && str[i] !== '\t') {
              return false;
          }
      }
      return true;
  };
  /**
   * <p>Checks if a String is not empty (""), not null and not whitespace only.</p>
   *
   * <pre>
   * isNotBlank(null)      = false
   * isNotBlank("")        = false
   * isNotBlank(" ")       = false
   * isNotBlank("bob")     = true
   * isNotBlank("  bob  ") = true
   * </pre>
   *
   * @param str  the String to check, may be null
   * @return <code>true</code> if the String is
   *  not empty and not null and not whitespace
   * @since 2.0
   */
   function isNotBlank(str) {
      return !isBlank(str);
  };
  /**
   * <p>Removes control characters (char &lt;= 32) from both
   * ends of this String, handling <code>null</code> by returning
   * an empty String ("").</p>
   *
   * <pre>
   * clean(null)          = ""
   * clean("")            = ""
   * clean("abc")         = "abc"
   * clean("    abc    ") = "abc"
   * clean("     ")       = ""
   * </pre>
   *
   * @param str  the String to clean, may be null
   * @return the trimmed text, never <code>null</code>
   * @deprecated Use the clearer named {@link #trimToEmpty(String)}.
   *             Method will be removed in Commons Lang 3.0.
   */
   function clean(str) {
      return str == null ? EMPTY : str.trim();
  };
  /**
   * <p>Removes control characters from both
   * ends of this String, handling <code>null</code> by returning
   * <code>null</code>.</p>
   *
   * Trim removes start and end characters &lt;= 32.
   *
   * <pre>
   * trim(null)          = null
   * trim("")            = ""
   * trim("     ")       = ""
   * trim("abc")         = "abc"
   * trim("    abc    ") = "abc"
   * </pre>
   *
   * @param str  the String to be trimmed, may be null
   * @return the trimmed string, <code>null</code> if null String input
   */
   function trim(str) {
      return str == null ? null : str.trim();
  };
  /**
   * <p>Removes control characters (char &lt;= 32) from both
   * ends of this String returning <code>null</code> if the String is
   * empty ("") after the trim or if it is <code>null</code>.
   *
   *
   * <pre>
   * trimToNull(null)          = null
   * trimToNull("")            = null
   * trimToNull("     ")       = null
   * trimToNull("abc")         = "abc"
   * trimToNull("    abc    ") = "abc"
   * </pre>
   *
   * @param str  the String to be trimmed, may be null
   * @return the trimmed String,
   *  <code>null</code> if only chars &lt;= 32, empty or null String input
   */
   function trimToNull(str) {
      var ts = trim(str);
      return isEmpty(ts) ? null : ts;
  };
  /**
   * <p>Removes control characters (char &lt;= 32) from both
   * ends of this String returning an empty String ("") if the String
   * is empty ("") after the trim or if it is <code>null</code>.
   *
   * <p>The String is trimmed using {@link String#trim()}.
   * Trim removes start and end characters &lt;= 32.
   * To strip whitespace use {@link #stripToEmpty(String)}.</p>
   *
   * <pre>
   * trimToEmpty(null)          = ""
   * trimToEmpty("")            = ""
   * trimToEmpty("     ")       = ""
   * trimToEmpty("abc")         = "abc"
   * trimToEmpty("    abc    ") = "abc"
   * </pre>
   *
   * @param str  the String to be trimmed, may be null
   * @return the trimmed String, or an empty String if <code>null</code> input
   */
   function trimToEmpty(str) {
      return str == null ? EMPTY : str.trim();
  };
  /**
   * <p>Replaces a String with another String inside a larger String,
   * for the first <code>max</code> values of the search String.</p>
   *
   * <p>A <code>null</code> reference passed to this method is a no-op.</p>
   *
   * <pre>
   * replace("abaa", "a", null, -1) = "abaa"
   * replace("abaa", "a", "", -1)   = "b"
   * replace("abaa", "a", "z", 0)   = "abaa"
   * replace("abaa", "a", "z", 1)   = "zbaa"
   * replace("abaa", "a", "z", 2)   = "zbza"
   * replace("abaa", "a", "z", -1)  = "zbzz"
   * </pre>
   *
   * @param text  text to search and replace in, may be null
   * @param searchString  the String to search for, may be null
   * @param replacement  the String to replace it with, may be null
   * @param max  maximum number of values to replace, or <code>-1</code> if no maximum
   * @return the text with any replacements processed,
   *  <code>null</code> if null String input
   */
   function replace(text, searchString, replacement, max) {
      if (max == null || typeof max === 'undefined') {
          max = -1;
      }
      if (isEmpty(text) || isEmpty(searchString) || replacement === null || max === 0) {
          return text;
      }
      var start = 0;
      var end = text.indexOf(searchString, start);
      if (end === INDEX_NOT_FOUND) {
          return text;
      }
      var replLength = searchString.length;
      var increase = replacement.length - replLength;
      increase = (increase < 0 ? 0 : increase);
      increase *= (max < 0 ? 16 : (max > 64 ? 64 : max));
      var buf = new Array();
      while (end !== INDEX_NOT_FOUND) {
          buf.push(text.substring(start, end));
          buf.push(replacement);
          start = end + replLength;
          if (--max === 0) {
              break;
          }
          end = text.indexOf(searchString, start);
      }
      buf.push(text.substring(start));
      return buf.join("");
  };

  /**
	 * "Safer" String.toLowerCase()
	 */
	 function lowerCase(str){
	  return str.toLowerCase();
	}

	/**
	 * "Safer" String.toUpperCase()
	 */
	 function upperCase(str){
	  return str.toUpperCase();
	}

	/**
	* Convert string to camelCase text.
	*/
	 function camelCase(str){
	  str = replaceAccents(str);
	  str = removeNonWord(str)
	  		.replace(/\_/g, ' ') //convert all underscore to spaces
	      .replace(/\-/g, ' ') //convert all hyphens to spaces
	      .replace(/\s[a-z]/g, upperCase) //convert first char of each word to UPPERCASE
	      .replace(/\s+/g, '') //remove spaces
	      .replace(/^[A-Z]/g, lowerCase); //convert first char to lowercase
	  return str;
	}

	/**
	 * Add space between camelCase text.
	 */
	 function unCamelCase(str){
	  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
	  str = str.toLowerCase(); //add space between camelCase text
	  return str;
	}

	/**
	 * UPPERCASE first char of each word.
	 */
	 function properCase(str){
	  return lowerCase(str).replace(/^\w|\s\w/g, upperCase);
	}

	/**
	 * camelCase + UPPERCASE first char
	 */
	 function pascalCase(str){
	  return camelCase(str).replace(/^[a-z]/, upperCase);
	}

	 function normalizeLineBreaks(str, lineEnd) {
	  lineEnd = lineEnd || 'n';

	  return str
	    .replace(/rn/g, lineEnd) // DOS
	    .replace(/r/g, lineEnd)   // Mac
	    .replace(/n/g, lineEnd);  // Unix
	}

	/**
	* UPPERCASE first char of each sentence and lowercase other chars.
	*/
	 function sentenceCase(str){
	  // Replace first char of each sentence (new line or after '.\s+') to
	  // UPPERCASE
	  return lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, upperCase);
	}

	/**
	 * Convert to lower case, remove accents, remove non-word chars and
	 * replace spaces with the specified delimeter.
	 * Does not split camelCase text.
	 */
	 function slugify(str, delimeter){
	  if (delimeter == null) {
	      delimeter = "-";
	  }

	  str = replaceAccents(str);
	  str = removeNonWord(str);
	  str = trim(str) //should come after removeNonWord
	          .replace(/ +/g, delimeter) //replace spaces with delimeter
	          .toLowerCase();

	  return str;
	}

	/**
	 * Replaces spaces with hyphens, split camelCase text, remove non-word chars, remove accents and convert to lower case.
	 */
	 function hyphenate(str){
	  str = unCamelCase(str);
	  return slugify(str, "-");
	}

	/**
	 * Replaces hyphens with spaces. (only hyphens between word chars)
	 */
	 function unhyphenate(str){
	  return str.replace(/(\w)(-)(\w)/g, '$1 $3');
	}

	/**
	 * Replaces spaces with underscores, split camelCase text, remove
	 * non-word chars, remove accents and convert to lower case.
	 */
	 function underscore(str){
	  str = unCamelCase(str);
	  return slugify(str, "_");
	}

	/**
	 * Remove non-word chars.
	 */
	 function removeNonWord(str){
	  return str.replace(/[^0-9a-zA-Z\xC0-\xFF\s\-\_]/g, '');
	}

	/**
	 * Convert line-breaks from DOS/MAC to a single standard (UNIX by default)
	 */
	 function normalizeLineBreaks(str, lineEnd) {
	  lineEnd = lineEnd || '\n';

	  return str
	      .replace(/\r\n/g, lineEnd) // DOS
	      .replace(/\r/g, lineEnd)   // Mac
	      .replace(/\n/g, lineEnd);  // Unix
	}

	/**
	* Replaces all accented chars with regular ones
	*/
	 function replaceAccents(str){
	  // verifies if the String has accents and replace them
	  if (str.search(/[\xC0-\xFF]/g) > -1) {
	      str = str
	              .replace(/[\xC0-\xC5]/g, "A")
	              .replace(/[\xC6]/g, "AE")
	              .replace(/[\xC7]/g, "C")
	              .replace(/[\xC8-\xCB]/g, "E")
	              .replace(/[\xCC-\xCF]/g, "I")
	              .replace(/[\xD0]/g, "D")
	              .replace(/[\xD1]/g, "N")
	              .replace(/[\xD2-\xD6\xD8]/g, "O")
	              .replace(/[\xD9-\xDC]/g, "U")
	              .replace(/[\xDD]/g, "Y")
	              .replace(/[\xDE]/g, "P")
	              .replace(/[\xE0-\xE5]/g, "a")
	              .replace(/[\xE6]/g, "ae")
	              .replace(/[\xE7]/g, "c")
	              .replace(/[\xE8-\xEB]/g, "e")
	              .replace(/[\xEC-\xEF]/g, "i")
	              .replace(/[\xF1]/g, "n")
	              .replace(/[\xF2-\xF6\xF8]/g, "o")
	              .replace(/[\xF9-\xFC]/g, "u")
	              .replace(/[\xFE]/g, "p")
	              .replace(/[\xFD\xFF]/g, "y");
	  }

	  return str;
	}

	/**
	 * Searches for a given substring
	 */
	 function contains(str, substring, fromIndex){
	  return str.indexOf(substring, fromIndex) !== -1;
	}

	/**
	 * Truncate string at full words.
	 */
	  function crop(str, maxChars, append) {
	  return truncate(str, maxChars, append, true);
	 }

	/**
	 * Escape RegExp string chars.
	 */
	 function escapeRegExp(str) {
	    var ESCAPE_CHARS = /[\\.+*?\^$\[\](){}\/'#]/g;
	    return str.replace(ESCAPE_CHARS,'\\$&');
	}

	/**
	 * Escapes a string for insertion into HTML.
	 */
	 function escapeHtml(str){
	  str = str
	      .replace(/&/g, '&amp;')
	      .replace(/</g, '&lt;')
	      .replace(/>/g, '&gt;')
	      .replace(/'/g, '&#39;')
	      .replace(/"/g, '&quot;');

	  return str;
	}

	/**
	 * Unescapes HTML special chars
	 */
	 function unescapeHtml(str){
	    str = str
	        .replace(/&amp;/g , '&')
	        .replace(/&lt;/g  , '<')
	        .replace(/&gt;/g  , '>')
	        .replace(/&#39;/g , "'")
	        .replace(/&quot;/g, '"');
	    return str;
	}

	/**
	* Escape string into unicode sequences
	*/
	 function escapeUnicode(str, shouldEscapePrintable){
	  return str.replace(/[\s\S]/g, function(ch){
	    // skip printable ASCII chars if we should not escape them
	    if (!shouldEscapePrintable && (/[\x20-\x7E]/).test(ch)) {
	        return ch;
	    }
	    // we use "000" and slice(-4) for brevity, need to pad zeros,
	    // unicode escape always have 4 chars after "\u"
	    return '\\u'+ ('000'+ ch.charCodeAt(0).toString(16)).slice(-4);
	  });
	}

	/**
	 * Remove HTML tags from string.
	 */
	 function stripHtmlTags(str){
	  return str.replace(/<[^>]*>/g, '');
	}

	/**
	 * Remove non-printable ASCII chars
	 */
	 function removeNonASCII(str){
	  // Matches non-printable ASCII chars -
	  // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
	  return str.replace(/[^\x20-\x7E]/g, '');
	}

	/**
	 * String interpolation
	 */
	 function interpolate(template, replacements, syntax){
	    var stache = /\{\{(\w+)\}\}/g; //mustache-like

	    function replaceFn(match, prop){
	        return (prop in replacements) ? replacements[prop] : '';
	    };

	    return template.replace(syntax || stache, replaceFn);
	}

	/**
	 * Pad string with `char` if its' length is smaller than `minLen`
	 */
	 function rpad(str, minLen, ch) {
	  ch = ch || ' ';
	  return (str.length < minLen)? str + repeat(ch, minLen - str.length) : str;
	}

	/**
	 * Pad string with `char` if its' length is smaller than `minLen`
	 */
	 function lpad(str, minLen, ch) {
	  ch = ch || ' ';

	  return ((str.length < minLen)
	      ? repeat(ch, minLen - str.length) + str : str);
	}

	/**
	* Repeat string n times
	*/
	 function repeat(str, n){
	  return (new Array(n + 1)).join(str);
	}

	/**
	* Limit number of chars.
	*/
	 function truncate(str, maxChars, append, onlyFullWords){
	  append = append || '...';
	  maxChars = onlyFullWords? maxChars + 1 : maxChars;

	  str = trim(str);
	  if(str.length <= maxChars){
	      return str;
	  }
	  str = str.substr(0, maxChars - append.length);
	  //crop at last space or remove trailing whitespace
	  str = onlyFullWords? str.substr(0, str.lastIndexOf(' ')) : trim(str);
	  return str + append;
	}

	var WHITE_SPACES = [
	    ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
	    '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
	    '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
	    '\u205F', '\u3000'
	];

	/**
	* Remove chars from beginning of string.
	*/
	 function ltrim(str, chars) {
	  chars = chars || WHITE_SPACES;

	  var start = 0,
	      len = str.length,
	      charLen = chars.length,
	      found = true,
	      i, c;

	  while (found && start < len) {
	      found = false;
	      i = -1;
	      c = str.charAt(start);

	      while (++i < charLen) {
	          if (c === chars[i]) {
	              found = true;
	              start++;
	              break;
	          }
	      }
	  }

	  return (start >= len) ? '' : str.substr(start, len);
	}

	/**
	* Remove chars from end of string.
	*/
	 function rtrim(str, chars) {
	  chars = chars || WHITE_SPACES;

	  var end = str.length - 1,
	      charLen = chars.length,
	      found = true,
	      i, c;

	  while (found && end >= 0) {
	      found = false;
	      i = -1;
	      c = str.charAt(end);

	      while (++i < charLen) {
	          if (c === chars[i]) {
	              found = true;
	              end--;
	              break;
	          }
	      }
	  }

	  return (end >= 0) ? str.substring(0, end + 1) : '';
	}

	/**
	 * Capture all capital letters following a word boundary (in case the
	 * input is in all caps)
	 */
	 function abbreviate(str) {
	  return str.match(/\b([A-Z])/g).join('');
	}

  return StringUtils;
}