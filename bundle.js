/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/SaveVideoManager.js":
/*!************************************!*\
  !*** ./src/js/SaveVideoManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveVideoManager)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var setData = function setData(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
};

var getData = function getData(key) {
  return JSON.parse(localStorage.getItem(key));
};

var SaveVideoManager = /*#__PURE__*/function () {
  function SaveVideoManager() {
    _classCallCheck(this, SaveVideoManager);

    this.videoIds = this.getVideoIds();
  }

  _createClass(SaveVideoManager, [{
    key: "getVideoIds",
    value: function getVideoIds() {
      return getData('id') || [];
    }
  }, {
    key: "findVideoById",
    value: function findVideoById(id) {
      return this.videoIds.includes(id);
    }
  }, {
    key: "saveVideoById",
    value: function saveVideoById(id) {
      if (this.videoIds.length >= _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_VIDEO_SAVE) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.MAX_VIDEO_SAVE);
      }

      this.videoIds.push(id);
      setData('id', this.videoIds);
    }
  }]);

  return SaveVideoManager;
}();



/***/ }),

/***/ "./src/js/SearchVideoManager.js":
/*!**************************************!*\
  !*** ./src/js/SearchVideoManager.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchVideoManager)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var DUMMY_YOUTUBE_API_ENDPOINT = function DUMMY_YOUTUBE_API_ENDPOINT(keyword) {
  return "https://brave-lichterman-77e301.netlify.app/dummy/youtube/v3/search?part=snippet&q=".concat(keyword, "&maxResults=").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DATA_FETCH_AT_ONCE);
};

var YOUTUBE_API_ENDPOINT = function YOUTUBE_API_ENDPOINT(keyword) {
  return "https://brave-lichterman-77e301.netlify.app/youtube/v3/search?part=snippet&q=".concat(keyword, "&maxResults=").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DATA_FETCH_AT_ONCE);
};

var YOUTUBE_API_ENDPOINT2 = function YOUTUBE_API_ENDPOINT2(keyword) {
  return "https://elastic-goldstine-10f16a.netlify.app/youtube/v3/search?part=snippet&q=".concat(keyword, "&maxResults=").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DATA_FETCH_AT_ONCE);
};

var WRONG_API_ENDPOINT = function WRONG_API_ENDPOINT(keyword) {
  return "https://elastic-goldstine-10f16a.netlify.app/search?part=snippettt&q=".concat(keyword, "&maxResults=").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DATA_FETCH_AT_ONCE);
};

var _isLastPage = /*#__PURE__*/new WeakMap();

var SearchVideoManager = /*#__PURE__*/function () {
  function SearchVideoManager() {
    _classCallCheck(this, SearchVideoManager);

    _classPrivateFieldInitSpec(this, _isLastPage, {
      writable: true,
      value: void 0
    });

    this.keyword = '';
    this.nextPageToken = '';

    _classPrivateFieldSet(this, _isLastPage, false);
  }

  _createClass(SearchVideoManager, [{
    key: "isLastPage",
    get: function get() {
      return _classPrivateFieldGet(this, _isLastPage);
    }
  }, {
    key: "search",
    value: function search() {
      var _this = this;

      var newKeyword = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.keyword;

      if (newKeyword !== this.keyword) {
        this.resetNextPageToken();
      }

      return this.fetchYoutubeData(newKeyword).then(function (data) {
        return _this.processVideoData(data);
      });
    }
  }, {
    key: "resetNextPageToken",
    value: function resetNextPageToken() {
      this.nextPageToken = '';

      _classPrivateFieldSet(this, _isLastPage, false);
    }
  }, {
    key: "fetchYoutubeData",
    value: function fetchYoutubeData(keyword) {
      var _this2 = this;

      return fetch(this.nextPageToken ? "".concat(YOUTUBE_API_ENDPOINT(keyword), "&pageToken=").concat(this.nextPageToken) : YOUTUBE_API_ENDPOINT(keyword)).then(function (response) {
        if (!response.ok) {
          throw new Error(response.status);
        }

        _this2.keyword = keyword;
        return response.json();
      });
    }
  }, {
    key: "processVideoData",
    value: function processVideoData(result) {
      if (!result.nextPageToken) _classPrivateFieldSet(this, _isLastPage, true);
      this.nextPageToken = result.nextPageToken;
      return result.items.map(function (item) {
        return {
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          channelName: item.snippet.channelTitle,
          publishedDate: item.snippet.publishedAt
        };
      });
    }
  }]);

  return SearchVideoManager;
}();



/***/ }),

/***/ "./src/js/View/HomeView.js":
/*!*********************************!*\
  !*** ./src/js/View/HomeView.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomeView)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var HomeView = /*#__PURE__*/function () {
  function HomeView() {
    _classCallCheck(this, HomeView);

    this.bindEvents();
  }

  _createClass(HomeView, [{
    key: "bindEvents",
    value: function bindEvents() {
      (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-modal-button').addEventListener('click', this.openModal.bind(this));
    }
  }, {
    key: "openModal",
    value: function openModal() {
      (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#modal-container').classList.remove('hide');
    }
  }]);

  return HomeView;
}();



/***/ }),

/***/ "./src/js/View/SearchKeywordFormView.js":
/*!**********************************************!*\
  !*** ./src/js/View/SearchKeywordFormView.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchKeywordFormView)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var SearchKeywordFormView = /*#__PURE__*/function () {
  function SearchKeywordFormView() {
    _classCallCheck(this, SearchKeywordFormView);

    this.bindEvents();
  }

  _createClass(SearchKeywordFormView, [{
    key: "bindEvents",
    value: function bindEvents() {
      (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-form').addEventListener('submit', this.onSubmitSearchForm.bind(this));
    }
  }, {
    key: "onSubmitSearchForm",
    value: function onSubmitSearchForm(e) {
      e.preventDefault();
      var keyword = (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-input-keyword').value;
      var searchKeywordEvent = new CustomEvent('searchKeyword', {
        detail: {
          keyword: keyword
        }
      });
      (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-modal').dispatchEvent(searchKeywordEvent);
    }
  }]);

  return SearchKeywordFormView;
}();



/***/ }),

/***/ "./src/js/View/SearchModalView.js":
/*!****************************************!*\
  !*** ./src/js/View/SearchModalView.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchModalView)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _SearchKeywordFormView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchKeywordFormView */ "./src/js/View/SearchKeywordFormView.js");
/* harmony import */ var _SearchResultView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchResultView */ "./src/js/View/SearchResultView.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _modal = /*#__PURE__*/new WeakMap();

var SearchModalView = /*#__PURE__*/function () {
  function SearchModalView() {
    _classCallCheck(this, SearchModalView);

    _classPrivateFieldInitSpec(this, _modal, {
      writable: true,
      value: void 0
    });

    this.searchKeywordFormView = new _SearchKeywordFormView__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.searchResultView = new _SearchResultView__WEBPACK_IMPORTED_MODULE_2__["default"]();

    _classPrivateFieldSet(this, _modal, (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-modal'));

    this.bindEvents();
  }

  _createClass(SearchModalView, [{
    key: "modal",
    get: function get() {
      return _classPrivateFieldGet(this, _modal);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('.dimmer').addEventListener('click', this.closeModal);
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#modal-container').classList.add('hide');
    }
  }, {
    key: "updateOnKeywordSearchLoading",
    value: function updateOnKeywordSearchLoading() {
      this.searchResultView.resetSearchResultVideoList();
      this.searchResultView.updateOnLoading();
    }
  }, {
    key: "updateOnScrollLoading",
    value: function updateOnScrollLoading() {
      this.searchResultView.updateOnLoading();
    }
  }, {
    key: "updateOnSearchDataReceived",
    value: function updateOnSearchDataReceived(videos) {
      this.searchResultView.updateOnSearchDataReceived(videos);
    }
  }, {
    key: "updateSearchErrorResult",
    value: function updateSearchErrorResult() {
      this.searchResultView.showErrorResult();
    }
  }]);

  return SearchModalView;
}();



/***/ }),

/***/ "./src/js/View/SearchResultView.js":
/*!*****************************************!*\
  !*** ./src/js/View/SearchResultView.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchResultView)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template */ "./src/js/View/template.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var SearchResultView = /*#__PURE__*/function () {
  function SearchResultView() {
    _classCallCheck(this, SearchResultView);

    this.isShownNoResult = false;
    this.searchModal = (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-modal');
    this.searchResultSection = (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-result-section', this.searchModal);
    this.searchResultVideoList = (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#search-result-video-list', this.searchResultSection);
    this.noResultContainer = (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#no-result-container', this.searchResultSection);
    this.noResultDescription = (0,_util__WEBPACK_IMPORTED_MODULE_0__.$)('#no-result-description', this.noResultContainer);
    this.bindEvents();
  }

  _createClass(SearchResultView, [{
    key: "bindEvents",
    value: function bindEvents() {
      this.searchResultVideoList.addEventListener('click', this.onClickVideoSaveButton.bind(this));
      this.searchResultVideoList.addEventListener('scroll', this.onScrollVideoList.bind(this));
    }
  }, {
    key: "onScrollVideoList",
    value: function onScrollVideoList() {
      var _this$searchResultVid = this.searchResultVideoList,
          scrollTop = _this$searchResultVid.scrollTop,
          clientHeight = _this$searchResultVid.clientHeight,
          scrollHeight = _this$searchResultVid.scrollHeight;
      var searchOnScrollEvent = new CustomEvent('searchOnScroll', {
        detail: {
          scrollTop: scrollTop,
          clientHeight: clientHeight,
          scrollHeight: scrollHeight
        }
      });
      this.searchModal.dispatchEvent(searchOnScrollEvent);
    }
  }, {
    key: "onClickVideoSaveButton",
    value: function onClickVideoSaveButton(_ref) {
      var target = _ref.target;

      if (target.tagName === 'BUTTON') {
        var saveVideoEvent = new CustomEvent('saveVideo', {
          detail: {
            target: target
          }
        });
        this.searchModal.dispatchEvent(saveVideoEvent);
      }
    }
  }, {
    key: "resetSearchResultVideoList",
    value: function resetSearchResultVideoList() {
      this.searchResultVideoList.scrollTo(0, 0);
      this.searchResultVideoList.innerHTML = '';
    }
  }, {
    key: "updateOnLoading",
    value: function updateOnLoading() {
      this.searchResultVideoList.insertAdjacentHTML('beforeend', _template__WEBPACK_IMPORTED_MODULE_1__.template.skeletonListItem());
    }
  }, {
    key: "removeSkeletonListItem",
    value: function removeSkeletonListItem() {
      (0,_util__WEBPACK_IMPORTED_MODULE_0__.$$)('.skeleton', this.searchResultVideoList).forEach(function (listItem) {
        listItem.remove();
      });
    }
  }, {
    key: "showSearchResultVideoList",
    value: function showSearchResultVideoList() {
      this.noResultContainer.classList.add('hide');
      this.searchResultVideoList.classList.remove('hide');
      this.searchResultSection.classList.remove('search-result--no-result');
      this.isShownNoResult = false;
    }
  }, {
    key: "showNoResult",
    value: function showNoResult() {
      this.noResultContainer.classList.remove('hide');
      this.searchResultVideoList.classList.add('hide');
      this.searchResultSection.classList.add('search-result--no-result');
      this.noResultDescription.innerHTML = _template__WEBPACK_IMPORTED_MODULE_1__.MESSAGE.NO_RESULT;
      this.isShownNoResult = true;
    }
  }, {
    key: "showErrorResult",
    value: function showErrorResult() {
      this.noResultContainer.classList.remove('hide');
      this.searchResultVideoList.classList.add('hide');
      this.searchResultSection.classList.add('search-result--no-result');
      this.noResultDescription.innerHTML = _template__WEBPACK_IMPORTED_MODULE_1__.MESSAGE.ERROR_RESULT;
      this.isShownNoResult = true;
    }
  }, {
    key: "updateOnSearchDataReceived",
    value: function updateOnSearchDataReceived(videos) {
      if (videos.length === 0) {
        this.showNoResult();
        return;
      }

      if (this.isShownNoResult) {
        this.showSearchResultVideoList();
      }

      var listItems = videos.map(function (video) {
        return _template__WEBPACK_IMPORTED_MODULE_1__.template.videoListItem(video);
      }).join('');
      this.removeSkeletonListItem();
      this.searchResultVideoList.insertAdjacentHTML('beforeend', listItems);
    }
  }]);

  return SearchResultView;
}();



/***/ }),

/***/ "./src/js/View/template.js":
/*!*********************************!*\
  !*** ./src/js/View/template.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MESSAGE": () => (/* binding */ MESSAGE),
/* harmony export */   "template": () => (/* binding */ template)
/* harmony export */ });
var template = {
  videoListItem: function videoListItem(_ref) {
    var id = _ref.id,
        thumbnail = _ref.thumbnail,
        title = _ref.title,
        channelName = _ref.channelName,
        publishedDate = _ref.publishedDate,
        saved = _ref.saved;
    return "<li class=\"video-item\" data-video-id=\"".concat(id, "\">\n      <img src=").concat(thumbnail, " alt=\"video-item-thumbnail\" class=\"video-item__thumbnail\">\n      <h4 class=\"video-item__title\">").concat(title, "</h4>\n      <p class=\"video-item__channel-name\">").concat(channelName, "</p>\n      <p class=\"video-item__published-date\">").concat(publishedDate, "</p>\n      ").concat(saved ? '' : '<button class="video-item__save-button button">⬇ 저장</button>', "\n      </li>\n    ");
  },
  skeletonListItem: function skeletonListItem() {
    return "<li class=\"skeleton\">\n      <div class=\"image\"></div>\n      <p class=\"line\"></p>\n      <p class=\"line\"></p>\n    </li>".repeat(10);
  }
};
var MESSAGE = {
  NO_RESULT: '검색 결과가 없습니다<br />다른 키워드로 검색해보세요',
  ERROR_RESULT: '검색 결과를 가져오는데 실패했습니다.<br />관리자에게 문의하세요.'
};

/***/ }),

/***/ "./src/js/YoutubeClassRoom.js":
/*!************************************!*\
  !*** ./src/js/YoutubeClassRoom.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YoutubeClassRoom)
/* harmony export */ });
/* harmony import */ var _View_HomeView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View/HomeView */ "./src/js/View/HomeView.js");
/* harmony import */ var _View_SearchModalView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View/SearchModalView */ "./src/js/View/SearchModalView.js");
/* harmony import */ var _SearchVideoManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchVideoManager */ "./src/js/SearchVideoManager.js");
/* harmony import */ var _SaveVideoManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SaveVideoManager */ "./src/js/SaveVideoManager.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation */ "./src/js/validation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }









var YoutubeClassRoom = /*#__PURE__*/function () {
  function YoutubeClassRoom() {
    _classCallCheck(this, YoutubeClassRoom);

    this.homeView = new _View_HomeView__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.searchModalView = new _View_SearchModalView__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.searchVideoManager = new _SearchVideoManager__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.saveVideoManager = new _SaveVideoManager__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.bindEvents();
  }

  _createClass(YoutubeClassRoom, [{
    key: "bindEvents",
    value: function bindEvents() {
      this.searchModalView.modal.addEventListener('searchKeyword', this.onSubmitSearchKeyword.bind(this));
      this.searchModalView.modal.addEventListener('searchOnScroll', (0,_util__WEBPACK_IMPORTED_MODULE_6__.throttle)(this.searchOnScroll.bind(this), 100));
      this.searchModalView.modal.addEventListener('saveVideo', this.onClickVideoSaveButton.bind(this));
    }
  }, {
    key: "onSubmitSearchKeyword",
    value: function onSubmitSearchKeyword(e) {
      var keyword = e.detail.keyword;

      try {
        (0,_validation__WEBPACK_IMPORTED_MODULE_4__.validateSearchKeyword)(keyword);
      } catch (_ref) {
        var message = _ref.message;
        alert(message);
        return;
      }

      this.searchOnSubmitKeyword(keyword);
    }
  }, {
    key: "onClickVideoSaveButton",
    value: function onClickVideoSaveButton(e) {
      var target = e.detail.target;
      var videoId = target.parentNode.dataset.videoId;

      try {
        this.saveVideoManager.saveVideoById(videoId);
      } catch (_ref2) {
        var message = _ref2.message;
        return alert(message);
      }

      target.remove();
    }
  }, {
    key: "searchOnSubmitKeyword",
    value: function searchOnSubmitKeyword(keyword) {
      var _this = this;

      this.searchModalView.updateOnKeywordSearchLoading();
      this.searchVideoManager.search(keyword).then(function (videos) {
        var checkedVideos = _this.addSavedInfoToVideos(videos);

        _this.searchModalView.updateOnSearchDataReceived(checkedVideos);
      })["catch"](function () {
        _this.searchModalView.updateSearchErrorResult();
      });
    }
  }, {
    key: "searchOnScroll",
    value: function searchOnScroll(e) {
      var _this2 = this;

      if (this.impossibleToLoadMore(e)) return;
      this.searchModalView.updateOnScrollLoading();
      this.searchVideoManager.search().then(function (videos) {
        var checkedVideos = _this2.addSavedInfoToVideos(videos);

        _this2.searchModalView.updateOnSearchDataReceived(checkedVideos);
      })["catch"](function () {
        _this2.searchModalView.updateSearchErrorResult();
      });
    }
  }, {
    key: "addSavedInfoToVideos",
    value: function addSavedInfoToVideos(videos) {
      var _this3 = this;

      return videos.map(function (video) {
        return _objectSpread(_objectSpread({}, video), {}, {
          saved: _this3.saveVideoManager.findVideoById(video.id)
        });
      });
    }
  }, {
    key: "impossibleToLoadMore",
    value: function impossibleToLoadMore(e) {
      var _e$detail = e.detail,
          scrollTop = _e$detail.scrollTop,
          clientHeight = _e$detail.clientHeight,
          scrollHeight = _e$detail.scrollHeight;
      if (scrollTop + clientHeight + 200 < scrollHeight) return true;

      if (this.searchVideoManager.isLastPage) {
        alert(_constants__WEBPACK_IMPORTED_MODULE_5__.ALERT_MESSAGE.NO_MORE_SEARCH_RESULT);
        return true;
      }

      return false;
    }
  }]);

  return YoutubeClassRoom;
}();



/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALERT_MESSAGE": () => (/* binding */ ALERT_MESSAGE),
/* harmony export */   "ERROR_MESSAGE": () => (/* binding */ ERROR_MESSAGE),
/* harmony export */   "MAX_DATA_FETCH_AT_ONCE": () => (/* binding */ MAX_DATA_FETCH_AT_ONCE),
/* harmony export */   "MAX_VIDEO_SAVE": () => (/* binding */ MAX_VIDEO_SAVE),
/* harmony export */   "SEARCH_KEYWORD_MIN_LENGTH": () => (/* binding */ SEARCH_KEYWORD_MIN_LENGTH)
/* harmony export */ });
var SEARCH_KEYWORD_MIN_LENGTH = 2;
var MAX_VIDEO_SAVE = 100;
var MAX_DATA_FETCH_AT_ONCE = 10;
var ERROR_MESSAGE = {
  SEARCH_KEYWORD_MIN_LENGTH: "\uAC80\uC0C9 \uD0A4\uC6CC\uB4DC\uB294 ".concat(SEARCH_KEYWORD_MIN_LENGTH, "\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4."),
  MAX_VIDEO_SAVE: "\uC800\uC7A5 \uC5D0\uB7EC! \uC601\uC0C1\uC740 \uCD5C\uB300 ".concat(MAX_VIDEO_SAVE, "\uAC1C\uB9CC \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")
};
var ALERT_MESSAGE = {
  NO_MORE_SEARCH_RESULT: '마지막 검색결과까지 모두 출력되었습니다.'
};

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "$$": () => (/* binding */ $$),
/* harmony export */   "throttle": () => (/* binding */ throttle)
/* harmony export */ });
var $ = function $(selector) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return node.querySelector(selector);
};
var $$ = function $$(selector) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return node.querySelectorAll(selector);
};
var throttle = function throttle(callback, delay) {
  var timerId;
  return function (event) {
    if (timerId) return;
    timerId = setTimeout(function () {
      callback(event);
      timerId = null;
    }, delay, event);
  };
};

/***/ }),

/***/ "./src/js/validation.js":
/*!******************************!*\
  !*** ./src/js/validation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateSearchKeyword": () => (/* binding */ validateSearchKeyword)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

var validateSearchKeyword = function validateSearchKeyword(searchKeyword) {
  if (searchKeyword.length < _constants__WEBPACK_IMPORTED_MODULE_0__.SEARCH_KEYWORD_MIN_LENGTH) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/app.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/app.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n    padding: 64px 0;\r\n    font-size: 16px;\r\n}\r\n\r\n#app {\r\n    max-width: 1020px;\r\n    margin: 0 auto;\r\n}\r\n\r\n.classroom-container__title {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    margin-bottom: 64px;\r\n}\r\n\r\n.nav {\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.button {\r\n    cursor: pointer;\r\n    border-radius: 4px;\r\n    border: none;\r\n    font-style: normal;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    letter-spacing: 1.25px;\r\n}\r\n\r\n.nav__button {\r\n    width: 80px;\r\n    height: 36px;\r\n    background: #F5F5F5;\r\n}\r\n\r\n.nav__button:hover {\r\n    background: #ebebeb;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/app.css"],"names":[],"mappings":"AAAA;IACI,eAAe;IACf,eAAe;AACnB;;AAEA;IACI,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,iBAAiB;IACjB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,mBAAmB;AACvB","sourcesContent":["body {\r\n    padding: 64px 0;\r\n    font-size: 16px;\r\n}\r\n\r\n#app {\r\n    max-width: 1020px;\r\n    margin: 0 auto;\r\n}\r\n\r\n.classroom-container__title {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    margin-bottom: 64px;\r\n}\r\n\r\n.nav {\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.button {\r\n    cursor: pointer;\r\n    border-radius: 4px;\r\n    border: none;\r\n    font-style: normal;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    letter-spacing: 1.25px;\r\n}\r\n\r\n.nav__button {\r\n    width: 80px;\r\n    height: 36px;\r\n    background: #F5F5F5;\r\n}\r\n\r\n.nav__button:hover {\r\n    background: #ebebeb;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/index.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/app.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./modal.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/modal.css");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nol,ul {\r\n    list-style: none;\r\n}\r\n\r\nhtml, body {\r\n    height: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\ninput, button, textarea, select {\r\n    font: inherit;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAGA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,mCAAmC;AACvC;;AAEA;IACI,aAAa;AACjB","sourcesContent":["@import './app.css';\r\n@import './modal.css';\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nol,ul {\r\n    list-style: none;\r\n}\r\n\r\nhtml, body {\r\n    height: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\ninput, button, textarea, select {\r\n    font: inherit;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/modal.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/modal.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-container {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.dimmer {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.search-modal {\r\n    position: relative;\r\n    width: 1080px;\r\n    height: 727px;\r\n    background: #FFFFFF;\r\n    border: 1px solid rgba(0, 0, 0, 0.12);\r\n    border-radius: 4px;\r\n    padding: 50px 30px 32px 30px;\r\n}\r\n\r\n.search-modal__title {\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    text-align: center;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.search-input {\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.search-input__keyword {\r\n    width: 400px;\r\n    height: 36px;\r\n    margin-right: 20px;\r\n    padding: 4px 8px;\r\n    border: 1px solid #B4B4B4;\r\n    border-radius: 4px;\r\n}\r\n\r\n.search-input__keyword::placeholder {\r\n    color: #8B8B8B;\r\n    font-size: 16px;\r\n}\r\n\r\n.search-input__search-button {\r\n    width: 72px;\r\n    height: 36px;\r\n    background: #00BCD4;\r\n    color: #FFFFFF;\r\n}\r\n\r\n.search-result.search-result--no-result {\r\n    height: 493px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.no-result {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.no-result__image {\r\n    width: 190px;\r\n    height: 140px;\r\n    margin-bottom: 32px;\r\n}\r\n\r\n.no-result__description {\r\n    font-size: 16px;\r\n    line-height: 150%;\r\n    text-align: center;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-list {\r\n    width: 1040px;\r\n    height: 493px;\r\n    display: flex;\r\n    flex-direction: row;\r\n    flex-wrap: wrap;\r\n    gap: 32px 20px;\r\n    overflow-y: scroll;\r\n}\r\n\r\n.video-item {\r\n    position: relative;\r\n    width: 240px;\r\n    height: 255px;\r\n}\r\n\r\n.video-item__thumbnail {\r\n    width: 100%;\r\n    height: 135px;\r\n}\r\n\r\n.video-item__title {\r\n    font-weight: bold;\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    margin: 4px 0;\r\n}\r\n\r\n.video-item__channel-name {\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.video-item__published-date {\r\n    font-size: 12px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-item__save-button {\r\n    position: absolute;\r\n    right: 0;\r\n    width: 80px;\r\n    height: 36px;\r\n    background: #F9F9F9;\r\n    margin-top: 4px;\r\n}\r\n\r\n.video-item__save-button:hover {\r\n    background: #efefef;\r\n}\r\n\r\n.skeleton {\r\n    width: 240px;\r\n}\r\n  \r\n.skeleton .image,\r\n.skeleton .line {\r\n    background-image: linear-gradient(\r\n    90deg,\r\n    #e0e0e0 0px,\r\n    #ededed 30px,\r\n    #e0e0e0 60px\r\n    );\r\n    animation: refresh 2s infinite ease-out;\r\n}\r\n  \r\n.skeleton .image {\r\n    height: 135px;\r\n}\r\n  \r\n.skeleton .line {\r\n    height: 24px;\r\n    margin: 6px 0;\r\n}\r\n  \r\n.skeleton .line:first-child {\r\n    width: 50%;\r\n}\r\n  \r\n.skeleton .line:last-child {\r\n    width: 80%;\r\n}\r\n  \r\n@keyframes refresh {\r\n    0% {\r\n      background-position: calc(-100px);\r\n    }\r\n    40%,\r\n    100% {\r\n      background-position: 320px;\r\n    }\r\n}\r\n\r\n.hide {\r\n    display: none;\r\n}", "",{"version":3,"sources":["webpack://./src/css/modal.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,YAAY;IACZ,aAAa;IACb,eAAe;IACf,MAAM;IACN,OAAO;AACX;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,8BAA8B;AAClC;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,aAAa;IACb,mBAAmB;IACnB,qCAAqC;IACrC,kBAAkB;IAClB,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;IAChB,yBAAyB;IACzB,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,aAAa;IACb,aAAa;IACb,mBAAmB;IACnB,eAAe;IACf,cAAc;IACd,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,WAAW;IACX,aAAa;AACjB;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,iBAAiB;IACjB,qBAAqB;IACrB,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;IACvB,aAAa;AACjB;;AAEA;IACI,eAAe;IACf,iBAAiB;IACjB,qBAAqB;IACrB,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;AAC3B;;AAEA;IACI,eAAe;IACf,iBAAiB;IACjB,qBAAqB;AACzB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,YAAY;AAChB;;AAEA;;IAEI;;;;;KAKC;IACD,uCAAuC;AAC3C;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,UAAU;AACd;;AAEA;IACI;MACE,iCAAiC;IACnC;IACA;;MAEE,0BAA0B;IAC5B;AACJ;;AAEA;IACI,aAAa;AACjB","sourcesContent":[".modal-container {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.dimmer {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.search-modal {\r\n    position: relative;\r\n    width: 1080px;\r\n    height: 727px;\r\n    background: #FFFFFF;\r\n    border: 1px solid rgba(0, 0, 0, 0.12);\r\n    border-radius: 4px;\r\n    padding: 50px 30px 32px 30px;\r\n}\r\n\r\n.search-modal__title {\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    text-align: center;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.search-input {\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.search-input__keyword {\r\n    width: 400px;\r\n    height: 36px;\r\n    margin-right: 20px;\r\n    padding: 4px 8px;\r\n    border: 1px solid #B4B4B4;\r\n    border-radius: 4px;\r\n}\r\n\r\n.search-input__keyword::placeholder {\r\n    color: #8B8B8B;\r\n    font-size: 16px;\r\n}\r\n\r\n.search-input__search-button {\r\n    width: 72px;\r\n    height: 36px;\r\n    background: #00BCD4;\r\n    color: #FFFFFF;\r\n}\r\n\r\n.search-result.search-result--no-result {\r\n    height: 493px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.no-result {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.no-result__image {\r\n    width: 190px;\r\n    height: 140px;\r\n    margin-bottom: 32px;\r\n}\r\n\r\n.no-result__description {\r\n    font-size: 16px;\r\n    line-height: 150%;\r\n    text-align: center;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-list {\r\n    width: 1040px;\r\n    height: 493px;\r\n    display: flex;\r\n    flex-direction: row;\r\n    flex-wrap: wrap;\r\n    gap: 32px 20px;\r\n    overflow-y: scroll;\r\n}\r\n\r\n.video-item {\r\n    position: relative;\r\n    width: 240px;\r\n    height: 255px;\r\n}\r\n\r\n.video-item__thumbnail {\r\n    width: 100%;\r\n    height: 135px;\r\n}\r\n\r\n.video-item__title {\r\n    font-weight: bold;\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    margin: 4px 0;\r\n}\r\n\r\n.video-item__channel-name {\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.video-item__published-date {\r\n    font-size: 12px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-item__save-button {\r\n    position: absolute;\r\n    right: 0;\r\n    width: 80px;\r\n    height: 36px;\r\n    background: #F9F9F9;\r\n    margin-top: 4px;\r\n}\r\n\r\n.video-item__save-button:hover {\r\n    background: #efefef;\r\n}\r\n\r\n.skeleton {\r\n    width: 240px;\r\n}\r\n  \r\n.skeleton .image,\r\n.skeleton .line {\r\n    background-image: linear-gradient(\r\n    90deg,\r\n    #e0e0e0 0px,\r\n    #ededed 30px,\r\n    #e0e0e0 60px\r\n    );\r\n    animation: refresh 2s infinite ease-out;\r\n}\r\n  \r\n.skeleton .image {\r\n    height: 135px;\r\n}\r\n  \r\n.skeleton .line {\r\n    height: 24px;\r\n    margin: 6px 0;\r\n}\r\n  \r\n.skeleton .line:first-child {\r\n    width: 50%;\r\n}\r\n  \r\n.skeleton .line:last-child {\r\n    width: 80%;\r\n}\r\n  \r\n@keyframes refresh {\r\n    0% {\r\n      background-position: calc(-100px);\r\n    }\r\n    40%,\r\n    100% {\r\n      background-position: 320px;\r\n    }\r\n}\r\n\r\n.hide {\r\n    display: none;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/images/not_found.png":
/*!*****************************************!*\
  !*** ./src/assets/images/not_found.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "not_found.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/index */ "./src/css/index.css");
/* harmony import */ var _js_YoutubeClassRoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/YoutubeClassRoom */ "./src/js/YoutubeClassRoom.js");
/* harmony import */ var _assets_images_not_found_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/images/not_found.png */ "./src/assets/images/not_found.png");



new _js_YoutubeClassRoom__WEBPACK_IMPORTED_MODULE_1__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map