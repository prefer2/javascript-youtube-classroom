/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Manager/SaveVideoManager.js":
/*!********************************************!*\
  !*** ./src/js/Manager/SaveVideoManager.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveVideoManager)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/js/constants.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../validation */ "./src/js/validation.js");





var setData = function setData(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
};

var getData = function getData(key) {
  return JSON.parse(localStorage.getItem(key));
};

var SaveVideoManager = /*#__PURE__*/function () {
  function SaveVideoManager() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SaveVideoManager);

    this.videoData = this.getVideoData();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SaveVideoManager, [{
    key: "getVideoData",
    value: function getVideoData() {
      return getData('id') || [];
    }
  }, {
    key: "findVideoById",
    value: function findVideoById(id) {
      return this.videoData.some(function (video) {
        return video.id === id;
      });
    }
  }, {
    key: "saveVideo",
    value: function saveVideo(video) {
      var videoInfo = {
        id: video.dataset.videoId,
        thumbnail: video.children[0].currentSrc,
        title: video.children[1].textContent,
        channelName: video.children[2].textContent,
        publishedDate: video.children[3].textContent,
        watched: false
      };

      if ((0,_validation__WEBPACK_IMPORTED_MODULE_3__.isOverVideoSaveMaxCount)(this.videoData)) {
        throw new Error(_constants__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGE.MAX_VIDEO_SAVE);
      }

      if (this.findVideoById(videoInfo.id)) {
        throw new Error('이미 저장한 동영상입니다');
      }

      this.videoData.push(videoInfo);
      setData('id', this.videoData);
    }
  }, {
    key: "changeWatchState",
    value: function changeWatchState(id) {
      this.videoData = this.videoData.map(function (video) {
        if (video.id === id) {
          var changedVideo = video;
          changedVideo.watched = !changedVideo.watched;
          return changedVideo;
        }

        return video;
      });
      setData('id', this.videoData);
    }
  }, {
    key: "removeVideo",
    value: function removeVideo(id) {
      this.videoData = this.videoData.filter(function (video) {
        return video.id !== id;
      });
      setData('id', this.videoData);
    }
  }]);

  return SaveVideoManager;
}();



/***/ }),

/***/ "./src/js/Manager/SearchVideoManager.js":
/*!**********************************************!*\
  !*** ./src/js/Manager/SearchVideoManager.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchVideoManager)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _youtubeApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../youtubeApi */ "./src/js/youtubeApi.js");





function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }




var _isLastPage = /*#__PURE__*/new WeakMap();

var SearchVideoManager = /*#__PURE__*/function () {
  function SearchVideoManager() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SearchVideoManager);

    _classPrivateFieldInitSpec(this, _isLastPage, {
      writable: true,
      value: void 0
    });

    this.keyword = '';
    this.nextPageToken = '';

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _isLastPage, false);

    this.totalVideoData = [];
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SearchVideoManager, [{
    key: "isLastPage",
    get: function get() {
      return (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_2__["default"])(this, _isLastPage);
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

      (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _isLastPage, false);
    }
  }, {
    key: "fetchYoutubeData",
    value: function fetchYoutubeData(keyword) {
      var _this2 = this;

      return node_fetch__WEBPACK_IMPORTED_MODULE_4___default()((0,_youtubeApi__WEBPACK_IMPORTED_MODULE_5__.YOUTUBE_API_ENDPOINT)(keyword, this.nextPageToken)).then(function (response) {
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
      if (!result.nextPageToken) (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _isLastPage, true);
      this.nextPageToken = result.nextPageToken;
      return this.parseVideoInfo(result);
    }
  }, {
    key: "parseVideoInfo",
    value: function parseVideoInfo(videoList) {
      return videoList.items.map(function (item) {
        return {
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          channelName: item.snippet.channelTitle,
          publishedDate: new Date(item.snippet.publishedAt)
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
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _SearchModalView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchModalView */ "./src/js/View/SearchModalView.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template */ "./src/js/View/template.js");






var HomeView = /*#__PURE__*/function () {
  function HomeView(searchVideoManager, saveVideoManager) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, HomeView);

    this.saveVideoManager = saveVideoManager;
    this.modalView = new _SearchModalView__WEBPACK_IMPORTED_MODULE_3__["default"](searchVideoManager, this.saveVideoManager);
    this.tab = 'willWatch';
    this.bindEvents();
    this.initializeHomepage();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(HomeView, [{
    key: "bindEvents",
    value: function bindEvents() {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#search-modal-button').addEventListener('click', this.openModal.bind(this));
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-button').addEventListener('click', this.openWillWatchPage.bind(this));
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-button').addEventListener('click', this.openWatchedPage.bind(this));
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#search-modal').addEventListener('saveVideo', this.addSaveVideo.bind(this));
    }
  }, {
    key: "openModal",
    value: function openModal() {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#modal-container').classList.remove('hide');
    }
  }, {
    key: "initializeHomepage",
    value: function initializeHomepage() {
      var _this = this;

      var savedVideo = this.saveVideoManager.getVideoData();
      savedVideo.forEach(function (video) {
        if (!video.watched) {
          _this.addWillWatchVideo(video);
        } else {
          _this.addWatchedVideo(video);
        }
      });
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$$)('.watch-delete-button').forEach(function (element) {
        element.addEventListener('click', function (e) {
          var action = e.target.dataset.action;

          if (action) {
            _this[action](e);
          }
        });
      });
      this.openWillWatchPage();
    }
  }, {
    key: "openWillWatchPage",
    value: function openWillWatchPage() {
      this.tab = 'willWatch';
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-button').classList.add('selected', 'block-toggle');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-button').classList.remove('selected', 'block-toggle');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').classList.add('hide');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('.no-watched-video__image').classList.add('hide');

      if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').children.length === 0) {
        this.showEmptyWillWatchVideo();
        return;
      }

      this.showWillWatchVideo();
    }
  }, {
    key: "openWatchedPage",
    value: function openWatchedPage() {
      this.tab = 'watched';
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-button').classList.remove('selected', 'block-toggle');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-button').classList.add('selected', 'block-toggle');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').classList.add('hide');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('.no-saved-video__image').classList.add('hide');

      if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').children.length === 0) {
        this.showEmptyWatchedVideo();
        return;
      }

      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').classList.remove('hide');
    }
  }, {
    key: "addSaveVideo",
    value: function addSaveVideo(e) {
      var _this2 = this;

      var target = e.detail.target;

      try {
        this.saveVideoManager.saveVideo(target.parentNode);
      } catch (_ref) {
        var message = _ref.message;
        return alert(message);
      }

      var savedVideo = this.saveVideoManager.getVideoData();
      this.addWillWatchVideo(savedVideo[savedVideo.length - 1]);
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').firstChild.lastElementChild.addEventListener('click', function (e) {
        var action = e.target.dataset.action;

        if (action) {
          _this2[action](e);
        }
      });
      this.modalView.onClickVideoSaveButton(e);

      if (this.tab === 'willWatch') {
        this.openWillWatchPage();
      }
    }
  }, {
    key: "changeWatchState",
    value: function changeWatchState(e) {
      var target = e.target.parentNode.parentNode;
      e.target.classList.toggle('selected');
      this.saveVideoManager.changeWatchState(target.dataset.videoId);

      if (this.tab === 'watched') {
        (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').insertAdjacentElement('afterbegin', target);

        if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').children.length === 0) {
          this.showEmptyWatchedVideo();
        }
      }

      if (this.tab === 'willWatch') {
        (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').insertAdjacentElement('afterbegin', target);

        if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').children.length === 0) {
          this.showEmptyWillWatchVideo();
        }
      }
    }
  }, {
    key: "deleteVideo",
    value: function deleteVideo(e) {
      var _this3 = this;

      var target = e.target.parentNode.parentNode;
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#confirm-container').classList.remove('hide');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('.confirm-dimmer').addEventListener('click', this.closeConfirmModal);
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#yes-button').addEventListener('click', function () {
        return _this3.onClickYesButton(target);
      });
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#no-button').addEventListener('click', this.closeConfirmModal);
    }
  }, {
    key: "onClickYesButton",
    value: function onClickYesButton(target) {
      this.saveVideoManager.removeVideo(target.dataset.videoId);
      this.modalView.addSaveButton(target.dataset.videoId);
      target.remove();

      if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').children.length === 0 && !(0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').classList.contains('hide')) {
        this.showEmptyWillWatchVideo();
      }

      if ((0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').children.length === 0 && !(0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').classList.contains('hide')) {
        this.showEmptyWatchedVideo();
      }

      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#confirm-container').classList.add('hide');
    }
  }, {
    key: "addWillWatchVideo",
    value: function addWillWatchVideo(video) {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').insertAdjacentHTML('afterbegin', _template__WEBPACK_IMPORTED_MODULE_4__.template.watchVideoListItem(video));
    }
  }, {
    key: "addWatchedVideo",
    value: function addWatchedVideo(video) {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').insertAdjacentHTML('afterbegin', _template__WEBPACK_IMPORTED_MODULE_4__.template.watchVideoListItem(video));
    }
  }, {
    key: "closeConfirmModal",
    value: function closeConfirmModal() {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#confirm-container').classList.add('hide');
    }
  }, {
    key: "showWillWatchVideo",
    value: function showWillWatchVideo() {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('.no-saved-video__image').classList.add('hide');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').classList.remove('hide');
    }
  }, {
    key: "showEmptyWillWatchVideo",
    value: function showEmptyWillWatchVideo() {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('.no-saved-video__image').classList.remove('hide');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#will-watch-video-list').classList.add('hide');
    }
  }, {
    key: "showEmptyWatchedVideo",
    value: function showEmptyWatchedVideo() {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('.no-watched-video__image').classList.remove('hide');
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#watched-video-list').classList.add('hide');
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
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/js/util.js");




var SearchKeywordFormView = /*#__PURE__*/function () {
  function SearchKeywordFormView() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SearchKeywordFormView);

    this.bindEvents();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SearchKeywordFormView, [{
    key: "bindEvents",
    value: function bindEvents() {
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#search-form').addEventListener('submit', this.onSubmitSearchForm.bind(this));
    }
  }, {
    key: "onSubmitSearchForm",
    value: function onSubmitSearchForm(e) {
      e.preventDefault();
      var keyword = (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#search-input-keyword').value;
      var searchKeywordEvent = new CustomEvent('searchKeyword', {
        detail: {
          keyword: keyword
        }
      });
      (0,_util__WEBPACK_IMPORTED_MODULE_2__.$)('#search-modal').dispatchEvent(searchKeywordEvent);
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
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldGet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js");
/* harmony import */ var _babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classPrivateFieldSet */ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _SearchKeywordFormView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchKeywordFormView */ "./src/js/View/SearchKeywordFormView.js");
/* harmony import */ var _SearchResultView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SearchResultView */ "./src/js/View/SearchResultView.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants */ "./src/js/constants.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../validation */ "./src/js/validation.js");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }







var _modal = /*#__PURE__*/new WeakMap();

var SearchModalView = /*#__PURE__*/function () {
  function SearchModalView(searchManager, saveVideoManager) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SearchModalView);

    _classPrivateFieldInitSpec(this, _modal, {
      writable: true,
      value: void 0
    });

    (0,_babel_runtime_helpers_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _modal, (0,_util__WEBPACK_IMPORTED_MODULE_5__.$)('#search-modal'));

    this.searchKeywordFormView = new _SearchKeywordFormView__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.searchResultView = new _SearchResultView__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this.searchManager = searchManager;
    this.saveVideoManager = saveVideoManager;
    this.bindEvents();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SearchModalView, [{
    key: "bindEvents",
    value: function bindEvents() {
      (0,_util__WEBPACK_IMPORTED_MODULE_5__.$)('.dimmer').addEventListener('click', this.closeModal);

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _modal).addEventListener('searchKeyword', this.onSubmitSearchKeyword.bind(this));

      (0,_babel_runtime_helpers_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_3__["default"])(this, _modal).addEventListener('searchOnScroll', (0,_util__WEBPACK_IMPORTED_MODULE_5__.debounce)(this.searchOnScroll.bind(this), _constants__WEBPACK_IMPORTED_MODULE_8__.SCROLL_BUFFER_SECOND));
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      (0,_util__WEBPACK_IMPORTED_MODULE_5__.$)('#modal-container').classList.add('hide');
    }
  }, {
    key: "onSubmitSearchKeyword",
    value: function onSubmitSearchKeyword(e) {
      var keyword = e.detail.keyword;

      try {
        (0,_validation__WEBPACK_IMPORTED_MODULE_9__.validateSearchKeyword)(keyword);
      } catch (_ref) {
        var message = _ref.message;
        return alert(message);
      }

      this.searchOnSubmitKeyword(keyword);
    }
  }, {
    key: "onClickVideoSaveButton",
    value: function onClickVideoSaveButton(e) {
      var target = e.detail.target;
      target.classList.add('hide');
    }
  }, {
    key: "searchOnSubmitKeyword",
    value: function searchOnSubmitKeyword(keyword) {
      this.searchResultView.resetSearchResultVideoList();
      this.searchResultView.updateOnLoading();
      this.searchAndShowResult(keyword);
    }
  }, {
    key: "searchOnScroll",
    value: function searchOnScroll(e) {
      if (this.impossibleToLoadMore(e)) return;
      this.searchResultView.updateOnLoading();
      this.searchAndShowResult();
    }
  }, {
    key: "searchAndShowResult",
    value: function searchAndShowResult(keyword) {
      var _this = this;

      this.searchManager.search(keyword).then(function (videos) {
        var checkedVideos = _this.addSavedInfoToVideos(videos);

        _this.searchResultView.updateOnSearchDataReceived(checkedVideos);
      })["catch"](function () {
        _this.searchResultView.showErrorResult();
      });
    }
  }, {
    key: "addSavedInfoToVideos",
    value: function addSavedInfoToVideos(videos) {
      var _this2 = this;

      return videos.map(function (video) {
        return _objectSpread(_objectSpread({}, video), {}, {
          saved: _this2.saveVideoManager.findVideoById(video.id)
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
      if (scrollTop + clientHeight + _constants__WEBPACK_IMPORTED_MODULE_8__.SCROLL_BUFFER_HEIGHT < scrollHeight) return true;

      if (this.searchManager.isLastPage) {
        alert(_constants__WEBPACK_IMPORTED_MODULE_8__.ALERT_MESSAGE.NO_MORE_SEARCH_RESULT);
        return true;
      }

      return false;
    }
  }, {
    key: "addSaveButton",
    value: function addSaveButton(id) {
      this.searchResultView.addSaveButton(id);
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
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/js/util.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template */ "./src/js/View/template.js");






var SearchResultView = /*#__PURE__*/function () {
  function SearchResultView() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SearchResultView);

    this.isShownNoResult = false;
    this.searchModal = (0,_util__WEBPACK_IMPORTED_MODULE_3__.$)('#search-modal');
    this.searchResultSection = (0,_util__WEBPACK_IMPORTED_MODULE_3__.$)('#search-result-section', this.searchModal);
    this.searchResultVideoList = (0,_util__WEBPACK_IMPORTED_MODULE_3__.$)('#search-result-video-list', this.searchResultSection);
    this.noResultContainer = (0,_util__WEBPACK_IMPORTED_MODULE_3__.$)('#no-result-container', this.searchResultSection);
    this.noResultDescription = (0,_util__WEBPACK_IMPORTED_MODULE_3__.$)('#no-result-description', this.noResultContainer);
    this.bindEvents();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SearchResultView, [{
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
      this.searchResultVideoList.insertAdjacentHTML('beforeend', _template__WEBPACK_IMPORTED_MODULE_4__.template.skeletonListItem());
    }
  }, {
    key: "removeSkeletonListItem",
    value: function removeSkeletonListItem() {
      (0,_util__WEBPACK_IMPORTED_MODULE_3__.$$)('.skeleton', this.searchResultVideoList).forEach(function (listItem) {
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
    key: "showErrorResult",
    value: function showErrorResult() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _template__WEBPACK_IMPORTED_MODULE_4__.MESSAGE.ERROR_RESULT;
      this.noResultContainer.classList.remove('hide');
      this.searchResultVideoList.classList.add('hide');
      this.searchResultSection.classList.add('search-result--no-result');
      this.noResultDescription.innerHTML = message;
      this.isShownNoResult = true;
    }
  }, {
    key: "updateOnSearchDataReceived",
    value: function updateOnSearchDataReceived(videos) {
      if (videos.length === 0) {
        this.showErrorResult(_template__WEBPACK_IMPORTED_MODULE_4__.MESSAGE.NO_RESULT);
        return;
      }

      if (this.isShownNoResult) {
        this.showSearchResultVideoList();
      }

      var listItems = videos.map(function (video) {
        return _template__WEBPACK_IMPORTED_MODULE_4__.template.videoListItem(video);
      }).join('');
      this.removeSkeletonListItem();
      this.searchResultVideoList.insertAdjacentHTML('beforeend', listItems);
    }
  }, {
    key: "addSaveButton",
    value: function addSaveButton(id) {
      var resultList = this.searchResultVideoList.children;

      (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(resultList).forEach(function (item) {
        if (item.dataset.videoId === id) {
          item.lastElementChild.classList.remove('hide');
        }
      });
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/js/util.js");

var template = {
  videoListItem: function videoListItem(_ref) {
    var id = _ref.id,
        thumbnail = _ref.thumbnail,
        title = _ref.title,
        channelName = _ref.channelName,
        publishedDate = _ref.publishedDate,
        saved = _ref.saved;
    return "<li class=\"video-item\" data-video-id=".concat(id, ">\n      <img src=").concat(thumbnail, " alt=\"video-item-thumbnail\" class=\"video-item__thumbnail\">\n      <h4 class=\"video-item__title\">").concat(title, "</h4>\n      <p class=\"video-item__channel-name\">").concat(channelName, "</p>\n      <p class=\"video-item__published-date\">").concat((0,_util__WEBPACK_IMPORTED_MODULE_0__.parseDate)(publishedDate), "</p>\n      <button class=\"video-item__save-button button ").concat(saved ? 'hide' : '', "\" type=\"button\">\u2B07 \uC800\uC7A5</button>\n      </li>\n    ");
  },
  skeletonListItem: function skeletonListItem() {
    return "<li class=\"skeleton\">\n      <div class=\"image\"></div>\n      <p class=\"line\"></p>\n      <p class=\"line\"></p>\n    </li>".repeat(10);
  },
  watchVideoListItem: function watchVideoListItem(_ref2) {
    var id = _ref2.id,
        thumbnail = _ref2.thumbnail,
        title = _ref2.title,
        channelName = _ref2.channelName,
        publishedDate = _ref2.publishedDate,
        watched = _ref2.watched;
    return "<li class=\"video-item\" data-video-id=".concat(id, ">\n      <img src=").concat(thumbnail, " alt=\"video-item-thumbnail\" class=\"video-item__thumbnail\">\n      <h4 class=\"video-item__title\">").concat(title, "</h4>\n      <p class=\"video-item__channel-name\">").concat(channelName, "</p>\n      <p class=\"video-item__published-date\">").concat(publishedDate, "</p>\n      <div class=\"watch-delete-button\">\n        <button class=\"video-item__watched-button button ").concat(watched ? 'selected' : '', "\" type=\"button\" data-action=\"changeWatchState\">\u2705</button>\n        <button class=\"video-item__delete-button button\" type=\"button\" data-action=\"deleteVideo\">\uD83D\uDDD1</button>\n      </div>\n    </li>\n");
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
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Manager_SearchVideoManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Manager/SearchVideoManager */ "./src/js/Manager/SearchVideoManager.js");
/* harmony import */ var _Manager_SaveVideoManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Manager/SaveVideoManager */ "./src/js/Manager/SaveVideoManager.js");
/* harmony import */ var _View_HomeView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./View/HomeView */ "./src/js/View/HomeView.js");






var YoutubeClassRoom = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function YoutubeClassRoom() {
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, YoutubeClassRoom);

  this.searchVideoManager = new _Manager_SearchVideoManager__WEBPACK_IMPORTED_MODULE_2__["default"]();
  this.saveVideoManager = new _Manager_SaveVideoManager__WEBPACK_IMPORTED_MODULE_3__["default"]();
  this.homeView = new _View_HomeView__WEBPACK_IMPORTED_MODULE_4__["default"](this.searchVideoManager, this.saveVideoManager);
});



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
/* harmony export */   "SCROLL_BUFFER_HEIGHT": () => (/* binding */ SCROLL_BUFFER_HEIGHT),
/* harmony export */   "SCROLL_BUFFER_SECOND": () => (/* binding */ SCROLL_BUFFER_SECOND),
/* harmony export */   "SEARCH_KEYWORD_MIN_LENGTH": () => (/* binding */ SEARCH_KEYWORD_MIN_LENGTH)
/* harmony export */ });
var SEARCH_KEYWORD_MIN_LENGTH = 2;
var MAX_VIDEO_SAVE = 10;
var MAX_DATA_FETCH_AT_ONCE = 10;
var SCROLL_BUFFER_SECOND = 200;
var SCROLL_BUFFER_HEIGHT = 50;
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
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "parseDate": () => (/* binding */ parseDate)
/* harmony export */ });
var $ = function $(selector) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return node.querySelector(selector);
};
var $$ = function $$(selector) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return node.querySelectorAll(selector);
};
var debounce = function debounce(callback, delay) {
  var timerId;
  return function (event) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};
var parseDate = function parseDate(publishedDate) {
  return "".concat(publishedDate.getFullYear(), "\uB144 ").concat(publishedDate.getMonth(), "\uC6D4 ").concat(publishedDate.getDate(), "\uC77C");
};

/***/ }),

/***/ "./src/js/validation.js":
/*!******************************!*\
  !*** ./src/js/validation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isOverVideoSaveMaxCount": () => (/* binding */ isOverVideoSaveMaxCount),
/* harmony export */   "validateSearchKeyword": () => (/* binding */ validateSearchKeyword)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

var validateSearchKeyword = function validateSearchKeyword(searchKeyword) {
  if (searchKeyword.length < _constants__WEBPACK_IMPORTED_MODULE_0__.SEARCH_KEYWORD_MIN_LENGTH) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
};
var isOverVideoSaveMaxCount = function isOverVideoSaveMaxCount(videoIds) {
  return videoIds.length >= _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_VIDEO_SAVE;
};

/***/ }),

/***/ "./src/js/youtubeApi.js":
/*!******************************!*\
  !*** ./src/js/youtubeApi.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DUMMY_YOUTUBE_API_ENDPOINT": () => (/* binding */ DUMMY_YOUTUBE_API_ENDPOINT),
/* harmony export */   "YOUTUBE_API_ENDPOINT": () => (/* binding */ YOUTUBE_API_ENDPOINT)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

var REQUEST_PATH = 'youtube/v3/search';
var HOST_URL = 'https://brave-lichterman-77e301.netlify.app/';
var YOUTUBE_API_ENDPOINT = function YOUTUBE_API_ENDPOINT(keyword, pageToken) {
  var url = new URL(REQUEST_PATH, HOST_URL);
  var parameter = new URLSearchParams({
    part: 'snippet',
    maxResults: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DATA_FETCH_AT_ONCE,
    pageToken: pageToken || '',
    q: keyword,
    type: 'video'
  });
  url.search = parameter.toString();
  return url;
};
var DUMMY_YOUTUBE_API_ENDPOINT = function DUMMY_YOUTUBE_API_ENDPOINT(keyword, pageToken) {
  var url = new URL("dummy/".concat(REQUEST_PATH), HOST_URL);
  var parameter = new URLSearchParams({
    part: 'snippet',
    maxResults: _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DATA_FETCH_AT_ONCE,
    pageToken: pageToken || '',
    q: keyword,
    type: 'video'
  });
  url.search = parameter.toString();
  return url;
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n    padding: 64px 0;\r\n    font-size: 16px;\r\n}\r\n\r\n#app {\r\n    max-width: var(--xlarge-list-size);\r\n    margin: 0 auto;\r\n}\r\n\r\n.classroom-container__title {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    margin-bottom: 64px;\r\n}\r\n\r\n.nav {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin-bottom: 39px;\r\n}\r\n\r\n.button {\r\n    cursor: pointer;\r\n    border-radius: 4px;\r\n    border: none;\r\n    font-style: normal;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    letter-spacing: 1.25px;\r\n}\r\n\r\n.nav__button {\r\n    width: 80px;\r\n    height: 36px;\r\n    background: var(--nav-button-background-color);\r\n}\r\n\r\n.nav__button:hover {\r\n    background: var(--nav-button-hover-color);\r\n}\r\n\r\n.button-group{\r\n    display: inline-flex;\r\n}\r\n\r\n.no-saved-video__image, .no-watched-video__image{\r\n    width: 70%;\r\n}\r\n\r\n#will-watch-button{\r\n    width: 117px;\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 4px 0px 0px 4px;\r\n}\r\n\r\n#watched-button {\r\n    width: 117px;\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 0px 4px 4px 0px;\r\n}\r\n\r\n.selected {\r\n    background-color: var(--selected-background-color);\r\n}\r\n\r\n.block-toggle {\r\n    pointer-events: none;\r\n}\r\n\r\n#main-homepage-body {\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.watch-delete-button{\r\n    position: absolute;\r\n    right: 0;\r\n}\r\n\r\n.video-item__watched-button,\r\n.video-item__delete-button{\r\n    width: 36px;\r\n    height: 36px;\r\n}\r\n\r\n.video-item__watched-button:hover,\r\n.video-item__delete-button:hover{\r\n    background:  var(--nav-button-hover-color);\r\n}\r\n\r\n.no-saved-video {\r\n    text-align: center;\r\n    font-size: 30px;\r\n    color: gray;\r\n}\r\n\r\n@media screen and (max-width: 1280px) {\r\n    #app {\r\n        width: var(--large-list-size);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 960px) {\r\n    #app {\r\n        width: var(--medium-list-size);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 600px) {\r\n    #app {\r\n        width: var(--small-list-size);\r\n    }\r\n    #will-watch-button, #watched-button{\r\n        width: 90px;\r\n    }\r\n    .nav__button {\r\n        width: 40px;\r\n    }\r\n    .search-text{\r\n        display: none;\r\n    }\r\n  }", "",{"version":3,"sources":["webpack://./src/css/app.css"],"names":[],"mappings":"AAAA;IACI,eAAe;IACf,eAAe;AACnB;;AAEA;IACI,kCAAkC;IAClC,cAAc;AAClB;;AAEA;IACI,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,iBAAiB;IACjB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;IACf,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,8CAA8C;AAClD;;AAEA;IACI,yCAAyC;AAC7C;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,qCAAqC;IACrC,8BAA8B;AAClC;;AAEA;IACI,YAAY;IACZ,qCAAqC;IACrC,8BAA8B;AAClC;;AAEA;IACI,kDAAkD;AACtD;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,uBAAuB;AAC3B;;AAEA;IACI,kBAAkB;IAClB,QAAQ;AACZ;;AAEA;;IAEI,WAAW;IACX,YAAY;AAChB;;AAEA;;IAEI,0CAA0C;AAC9C;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,WAAW;AACf;;AAEA;IACI;QACI,6BAA6B;IACjC;EACF;;EAEA;IACE;QACI,8BAA8B;IAClC;EACF;;EAEA;IACE;QACI,6BAA6B;IACjC;IACA;QACI,WAAW;IACf;IACA;QACI,WAAW;IACf;IACA;QACI,aAAa;IACjB;EACF","sourcesContent":["body {\r\n    padding: 64px 0;\r\n    font-size: 16px;\r\n}\r\n\r\n#app {\r\n    max-width: var(--xlarge-list-size);\r\n    margin: 0 auto;\r\n}\r\n\r\n.classroom-container__title {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    margin-bottom: 64px;\r\n}\r\n\r\n.nav {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin-bottom: 39px;\r\n}\r\n\r\n.button {\r\n    cursor: pointer;\r\n    border-radius: 4px;\r\n    border: none;\r\n    font-style: normal;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    letter-spacing: 1.25px;\r\n}\r\n\r\n.nav__button {\r\n    width: 80px;\r\n    height: 36px;\r\n    background: var(--nav-button-background-color);\r\n}\r\n\r\n.nav__button:hover {\r\n    background: var(--nav-button-hover-color);\r\n}\r\n\r\n.button-group{\r\n    display: inline-flex;\r\n}\r\n\r\n.no-saved-video__image, .no-watched-video__image{\r\n    width: 70%;\r\n}\r\n\r\n#will-watch-button{\r\n    width: 117px;\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 4px 0px 0px 4px;\r\n}\r\n\r\n#watched-button {\r\n    width: 117px;\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 0px 4px 4px 0px;\r\n}\r\n\r\n.selected {\r\n    background-color: var(--selected-background-color);\r\n}\r\n\r\n.block-toggle {\r\n    pointer-events: none;\r\n}\r\n\r\n#main-homepage-body {\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.watch-delete-button{\r\n    position: absolute;\r\n    right: 0;\r\n}\r\n\r\n.video-item__watched-button,\r\n.video-item__delete-button{\r\n    width: 36px;\r\n    height: 36px;\r\n}\r\n\r\n.video-item__watched-button:hover,\r\n.video-item__delete-button:hover{\r\n    background:  var(--nav-button-hover-color);\r\n}\r\n\r\n.no-saved-video {\r\n    text-align: center;\r\n    font-size: 30px;\r\n    color: gray;\r\n}\r\n\r\n@media screen and (max-width: 1280px) {\r\n    #app {\r\n        width: var(--large-list-size);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 960px) {\r\n    #app {\r\n        width: var(--medium-list-size);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 600px) {\r\n    #app {\r\n        width: var(--small-list-size);\r\n    }\r\n    #will-watch-button, #watched-button{\r\n        width: 90px;\r\n    }\r\n    .nav__button {\r\n        width: 40px;\r\n    }\r\n    .search-text{\r\n        display: none;\r\n    }\r\n  }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/confirm.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/confirm.css ***!
  \*******************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".confirm-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n\n.confirm-modal {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 400px;\n  height: 250px;\n  background: var(--modal-background-color);\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  padding: 50px 30px 32px 30px;\n  align-items: center;\n  justify-content: center;\n}\n\n.confirm-buttons{\n  margin-top: 30px;\n}\n\n#yes-button, #no-button{\n  width: 90px;\n  height: 40px;\n  border: none;\n  border-radius: 4px;\n  color: white;\n  cursor: pointer;\n}\n\n#yes-button {\n  background-color: rgb(17, 209, 17);\n}\n\n#no-button {\n  background-color: rgb(245, 78, 78);\n}\n\n#yes-button:hover {\n  background-color: rgb(27, 226, 27);\n}\n\n#no-button:hover {\n  background-color: rgb(255, 103, 103);\n}\n\n.hide {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/confirm.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,eAAe;EACf,MAAM;EACN,OAAO;AACT;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,yCAAyC;EACzC,qCAAqC;EACrC,kBAAkB;EAClB,4BAA4B;EAC5B,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,aAAa;AACf","sourcesContent":[".confirm-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n\n.confirm-modal {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 400px;\n  height: 250px;\n  background: var(--modal-background-color);\n  border: 1px solid var(--border-color);\n  border-radius: 4px;\n  padding: 50px 30px 32px 30px;\n  align-items: center;\n  justify-content: center;\n}\n\n.confirm-buttons{\n  margin-top: 30px;\n}\n\n#yes-button, #no-button{\n  width: 90px;\n  height: 40px;\n  border: none;\n  border-radius: 4px;\n  color: white;\n  cursor: pointer;\n}\n\n#yes-button {\n  background-color: rgb(17, 209, 17);\n}\n\n#no-button {\n  background-color: rgb(245, 78, 78);\n}\n\n#yes-button:hover {\n  background-color: rgb(27, 226, 27);\n}\n\n#no-button:hover {\n  background-color: rgb(255, 103, 103);\n}\n\n.hide {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/custom/color.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/custom/color.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --nav-button-background-color: #F5F5F5;\r\n  --nav-button-hover-color: #ebebeb;\r\n  --border-color: rgba(0, 0, 0, 0.12);\r\n  --selected-background-color: rgba(0, 188, 212, 0.12);\r\n  --modal-dimmer-color: rgba(0, 0, 0, 0.5);\r\n  --modal-background-color: #ffffff;\r\n  --search-input-border-color: #B4B4B4;\r\n  --search-input-text-color: #8B8B8B;\r\n  --search-button-background-color: #00BCD4;\r\n  --search-button-text-color: #ffffff;\r\n  --video-save-button-background-color: #F9F9F9; \r\n  --video-save-button-hover-color: #efefef;\r\n  --skeleton-ui-dark-color: #e0e0e0;\r\n  --skeleton-ui-light-color: #ededed;\r\n}", "",{"version":3,"sources":["webpack://./src/css/custom/color.css"],"names":[],"mappings":"AAAA;EACE,sCAAsC;EACtC,iCAAiC;EACjC,mCAAmC;EACnC,oDAAoD;EACpD,wCAAwC;EACxC,iCAAiC;EACjC,oCAAoC;EACpC,kCAAkC;EAClC,yCAAyC;EACzC,mCAAmC;EACnC,6CAA6C;EAC7C,wCAAwC;EACxC,iCAAiC;EACjC,kCAAkC;AACpC","sourcesContent":[":root {\r\n  --nav-button-background-color: #F5F5F5;\r\n  --nav-button-hover-color: #ebebeb;\r\n  --border-color: rgba(0, 0, 0, 0.12);\r\n  --selected-background-color: rgba(0, 188, 212, 0.12);\r\n  --modal-dimmer-color: rgba(0, 0, 0, 0.5);\r\n  --modal-background-color: #ffffff;\r\n  --search-input-border-color: #B4B4B4;\r\n  --search-input-text-color: #8B8B8B;\r\n  --search-button-background-color: #00BCD4;\r\n  --search-button-text-color: #ffffff;\r\n  --video-save-button-background-color: #F9F9F9; \r\n  --video-save-button-hover-color: #efefef;\r\n  --skeleton-ui-dark-color: #e0e0e0;\r\n  --skeleton-ui-light-color: #ededed;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/custom/size.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/custom/size.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --xlarge-list-size: 1040px;\n  --large-list-size: 780px;\n  --medium-list-size: 520px;\n  --small-list-size: 260px;\n}", "",{"version":3,"sources":["webpack://./src/css/custom/size.css"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,wBAAwB;EACxB,yBAAyB;EACzB,wBAAwB;AAC1B","sourcesContent":[":root {\n  --xlarge-list-size: 1040px;\n  --large-list-size: 780px;\n  --medium-list-size: 520px;\n  --small-list-size: 260px;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_confirm_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./confirm.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/confirm.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_custom_color_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./custom/color.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/custom/color.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_custom_size_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./custom/size.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/custom/size.css");
// Imports







var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_confirm_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_custom_color_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_custom_size_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nol,ul {\r\n    list-style: none;\r\n}\r\n\r\nhtml, body {\r\n    height: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\ninput, button, textarea, select {\r\n    font: inherit;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAMA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,mCAAmC;AACvC;;AAEA;IACI,aAAa;AACjB","sourcesContent":["@import './app.css';\r\n@import './modal.css';\r\n@import './confirm.css';\r\n@import './custom/color.css';\r\n@import './custom/size.css';\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n}\r\n\r\nol,ul {\r\n    list-style: none;\r\n}\r\n\r\nhtml, body {\r\n    height: 100%;\r\n    -webkit-font-smoothing: antialiased;\r\n}\r\n\r\ninput, button, textarea, select {\r\n    font: inherit;\r\n}\r\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".modal-container {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.dimmer, .confirm-dimmer {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: var(--modal-dimmer-color);\r\n}\r\n\r\n.search-modal {\r\n    position: relative;\r\n    width: 94vw;\r\n    height: 727px;\r\n    background: var(--modal-background-color);\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 4px;\r\n    padding: 50px 30px 32px 30px;\r\n}\r\n\r\n.search-modal__title {\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    text-align: center;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.search-input {\r\n    margin: auto;\r\n    margin-bottom: 40px;\r\n    width: var(--xlarge-list-size);\r\n}\r\n\r\n#search-form{\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: stretch;\r\n}\r\n\r\n.search-input__keyword {\r\n    flex-grow: 1;\r\n    height: 36px;\r\n    margin-right: 20px;\r\n    padding: 4px 8px;\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 4px;\r\n}\r\n\r\n.search-input__keyword::placeholder {\r\n    color: var(--search-input-text-color);\r\n    font-size: 16px;\r\n}\r\n\r\n.search-input__search-button {\r\n    width: 72px;\r\n    height: 36px;\r\n    background: var(--search-button-background-color);\r\n    color: var( --search-button-text-color);\r\n}\r\n\r\n.search-result.search-result--no-result {\r\n    height: 493px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.no-result {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.no-result__image {\r\n    width: 190px;\r\n    height: 140px;\r\n    margin-bottom: 32px;\r\n}\r\n\r\n.no-result__description {\r\n    font-size: 16px;\r\n    line-height: 150%;\r\n    text-align: center;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-list {\r\n    display: grid;\r\n    width: var(--xlarge-list-size);\r\n    height: 493px;\r\n    grid-row-gap: 32px;\r\n    grid-column-gap: 20px;\r\n    grid-template-columns: repeat(4, 1fr);\r\n    justify-content: space-around;\r\n    overflow-y: scroll;\r\n    margin: auto;\r\n}\r\n\r\n.video-item {\r\n    position: relative;\r\n    width: 240px;\r\n    height: 255px;\r\n}\r\n\r\n.video-item__thumbnail {\r\n    width: 100%;\r\n    height: 135px;\r\n}\r\n\r\n.video-item__title {\r\n    font-weight: bold;\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    margin: 4px 0;\r\n}\r\n\r\n.video-item__channel-name {\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.video-item__published-date {\r\n    font-size: 12px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-item__save-button {\r\n    position: absolute;\r\n    right: 0;\r\n    width: 80px;\r\n    height: 36px;\r\n    background: var(--video-save-button-background-color);\r\n    margin-top: 4px;\r\n}\r\n\r\n.video-item__save-button:hover {\r\n    background: var(--video-save-button-hover-color);\r\n}\r\n\r\n.skeleton {\r\n    width: 240px;\r\n}\r\n  \r\n.skeleton .image,\r\n.skeleton .line {\r\n    background-image: linear-gradient(\r\n    90deg,\r\n    var(--skeleton-ui-dark-color) 0px,\r\n    var(--skeleton-ui-light-color) 30px,\r\n    var(--skeleton-ui-dark-color) 60px\r\n    );\r\n    animation: refresh 2s infinite ease-out;\r\n}\r\n  \r\n.skeleton .image {\r\n    height: 135px;\r\n}\r\n  \r\n.skeleton .line {\r\n    height: 24px;\r\n    margin: 6px 0;\r\n}\r\n  \r\n.skeleton .line:first-child {\r\n    width: 50%;\r\n}\r\n  \r\n.skeleton .line:last-child {\r\n    width: 80%;\r\n}\r\n  \r\n@keyframes refresh {\r\n    0% {\r\n      background-position: calc(-100px);\r\n    }\r\n    40%,\r\n    100% {\r\n      background-position: 320px;\r\n    }\r\n}\r\n\r\n.hide {\r\n    display: none;\r\n  }\r\n\r\n  \r\n  @media screen and (max-width: 1280px) {\r\n    .search-input{\r\n        width: var(--large-list-size);\r\n    }\r\n    .video-list {\r\n        width: var(--large-list-size);\r\n        grid-template-columns: repeat(3, 1fr);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 960px) {\r\n    .search-input{\r\n        width: var(--medium-list-size);\r\n    }\r\n    .video-list {\r\n        width: var(--medium-list-size);\r\n        grid-template-columns: repeat(2, 1fr);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 600px) {\r\n    .search-input{\r\n        width: var(--small-list-size);\r\n    }\r\n    .video-list {\r\n        width: var(--small-list-size);\r\n        grid-template-columns: repeat(1, 1fr);\r\n    }\r\n  }\r\n\r\n\r\n\r\n  \r\n  \r\n", "",{"version":3,"sources":["webpack://./src/css/modal.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,YAAY;IACZ,aAAa;IACb,eAAe;IACf,MAAM;IACN,OAAO;AACX;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,qCAAqC;AACzC;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,aAAa;IACb,yCAAyC;IACzC,qCAAqC;IACrC,kBAAkB;IAClB,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,mBAAmB;IACnB,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,oBAAoB;AACxB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;IAChB,qCAAqC;IACrC,kBAAkB;AACtB;;AAEA;IACI,qCAAqC;IACrC,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,iDAAiD;IACjD,uCAAuC;AAC3C;;AAEA;IACI,aAAa;IACb,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,aAAa;IACb,kBAAkB;IAClB,qBAAqB;IACrB,qCAAqC;IACrC,6BAA6B;IAC7B,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,WAAW;IACX,aAAa;AACjB;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,iBAAiB;IACjB,qBAAqB;IACrB,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;IACvB,aAAa;AACjB;;AAEA;IACI,eAAe;IACf,iBAAiB;IACjB,qBAAqB;IACrB,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;AAC3B;;AAEA;IACI,eAAe;IACf,iBAAiB;IACjB,qBAAqB;AACzB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,WAAW;IACX,YAAY;IACZ,qDAAqD;IACrD,eAAe;AACnB;;AAEA;IACI,gDAAgD;AACpD;;AAEA;IACI,YAAY;AAChB;;AAEA;;IAEI;;;;;KAKC;IACD,uCAAuC;AAC3C;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,UAAU;AACd;;AAEA;IACI;MACE,iCAAiC;IACnC;IACA;;MAEE,0BAA0B;IAC5B;AACJ;;AAEA;IACI,aAAa;EACf;;;EAGA;IACE;QACI,6BAA6B;IACjC;IACA;QACI,6BAA6B;QAC7B,qCAAqC;IACzC;EACF;;EAEA;IACE;QACI,8BAA8B;IAClC;IACA;QACI,8BAA8B;QAC9B,qCAAqC;IACzC;EACF;;EAEA;IACE;QACI,6BAA6B;IACjC;IACA;QACI,6BAA6B;QAC7B,qCAAqC;IACzC;EACF","sourcesContent":[".modal-container {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.dimmer, .confirm-dimmer {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: var(--modal-dimmer-color);\r\n}\r\n\r\n.search-modal {\r\n    position: relative;\r\n    width: 94vw;\r\n    height: 727px;\r\n    background: var(--modal-background-color);\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 4px;\r\n    padding: 50px 30px 32px 30px;\r\n}\r\n\r\n.search-modal__title {\r\n    font-weight: bold;\r\n    font-size: 34px;\r\n    line-height: 36px;\r\n    text-align: center;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n.search-input {\r\n    margin: auto;\r\n    margin-bottom: 40px;\r\n    width: var(--xlarge-list-size);\r\n}\r\n\r\n#search-form{\r\n    display: flex;\r\n    justify-content: space-around;\r\n    align-items: stretch;\r\n}\r\n\r\n.search-input__keyword {\r\n    flex-grow: 1;\r\n    height: 36px;\r\n    margin-right: 20px;\r\n    padding: 4px 8px;\r\n    border: 1px solid var(--border-color);\r\n    border-radius: 4px;\r\n}\r\n\r\n.search-input__keyword::placeholder {\r\n    color: var(--search-input-text-color);\r\n    font-size: 16px;\r\n}\r\n\r\n.search-input__search-button {\r\n    width: 72px;\r\n    height: 36px;\r\n    background: var(--search-button-background-color);\r\n    color: var( --search-button-text-color);\r\n}\r\n\r\n.search-result.search-result--no-result {\r\n    height: 493px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.no-result {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.no-result__image {\r\n    width: 190px;\r\n    height: 140px;\r\n    margin-bottom: 32px;\r\n}\r\n\r\n.no-result__description {\r\n    font-size: 16px;\r\n    line-height: 150%;\r\n    text-align: center;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-list {\r\n    display: grid;\r\n    width: var(--xlarge-list-size);\r\n    height: 493px;\r\n    grid-row-gap: 32px;\r\n    grid-column-gap: 20px;\r\n    grid-template-columns: repeat(4, 1fr);\r\n    justify-content: space-around;\r\n    overflow-y: scroll;\r\n    margin: auto;\r\n}\r\n\r\n.video-item {\r\n    position: relative;\r\n    width: 240px;\r\n    height: 255px;\r\n}\r\n\r\n.video-item__thumbnail {\r\n    width: 100%;\r\n    height: 135px;\r\n}\r\n\r\n.video-item__title {\r\n    font-weight: bold;\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    margin: 4px 0;\r\n}\r\n\r\n.video-item__channel-name {\r\n    font-size: 16px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.video-item__published-date {\r\n    font-size: 12px;\r\n    line-height: 24px;\r\n    letter-spacing: 0.5px;\r\n}\r\n\r\n.video-item__save-button {\r\n    position: absolute;\r\n    right: 0;\r\n    width: 80px;\r\n    height: 36px;\r\n    background: var(--video-save-button-background-color);\r\n    margin-top: 4px;\r\n}\r\n\r\n.video-item__save-button:hover {\r\n    background: var(--video-save-button-hover-color);\r\n}\r\n\r\n.skeleton {\r\n    width: 240px;\r\n}\r\n  \r\n.skeleton .image,\r\n.skeleton .line {\r\n    background-image: linear-gradient(\r\n    90deg,\r\n    var(--skeleton-ui-dark-color) 0px,\r\n    var(--skeleton-ui-light-color) 30px,\r\n    var(--skeleton-ui-dark-color) 60px\r\n    );\r\n    animation: refresh 2s infinite ease-out;\r\n}\r\n  \r\n.skeleton .image {\r\n    height: 135px;\r\n}\r\n  \r\n.skeleton .line {\r\n    height: 24px;\r\n    margin: 6px 0;\r\n}\r\n  \r\n.skeleton .line:first-child {\r\n    width: 50%;\r\n}\r\n  \r\n.skeleton .line:last-child {\r\n    width: 80%;\r\n}\r\n  \r\n@keyframes refresh {\r\n    0% {\r\n      background-position: calc(-100px);\r\n    }\r\n    40%,\r\n    100% {\r\n      background-position: 320px;\r\n    }\r\n}\r\n\r\n.hide {\r\n    display: none;\r\n  }\r\n\r\n  \r\n  @media screen and (max-width: 1280px) {\r\n    .search-input{\r\n        width: var(--large-list-size);\r\n    }\r\n    .video-list {\r\n        width: var(--large-list-size);\r\n        grid-template-columns: repeat(3, 1fr);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 960px) {\r\n    .search-input{\r\n        width: var(--medium-list-size);\r\n    }\r\n    .video-list {\r\n        width: var(--medium-list-size);\r\n        grid-template-columns: repeat(2, 1fr);\r\n    }\r\n  }\r\n\r\n  @media screen and (max-width: 600px) {\r\n    .search-input{\r\n        width: var(--small-list-size);\r\n    }\r\n    .video-list {\r\n        width: var(--small-list-size);\r\n        grid-template-columns: repeat(1, 1fr);\r\n    }\r\n  }\r\n\r\n\r\n\r\n  \r\n  \r\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/***/ ((module, exports) => {



// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports["default"] = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

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

/***/ "./src/assets/images/no_saved_video.png":
/*!**********************************************!*\
  !*** ./src/assets/images/no_saved_video.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "no_saved_video.png";

/***/ }),

/***/ "./src/assets/images/no_watched_video.png":
/*!************************************************!*\
  !*** ./src/assets/images/no_watched_video.png ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "no_watched_video.png";

/***/ }),

/***/ "./src/assets/images/not_found.png":
/*!*****************************************!*\
  !*** ./src/assets/images/not_found.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "not_found.png";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classApplyDescriptorGet)
/* harmony export */ });
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classApplyDescriptorSet)
/* harmony export */ });
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classExtractFieldDescriptor)
/* harmony export */ });
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldGet.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classPrivateFieldGet)
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorGet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorGet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "get");
  return (0,_classApplyDescriptorGet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classPrivateFieldSet.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classPrivateFieldSet)
/* harmony export */ });
/* harmony import */ var _classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classApplyDescriptorSet.js */ "./node_modules/@babel/runtime/helpers/esm/classApplyDescriptorSet.js");
/* harmony import */ var _classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classExtractFieldDescriptor.js */ "./node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js");


function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = (0,_classExtractFieldDescriptor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(receiver, privateMap, "set");
  (0,_classApplyDescriptorSet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(receiver, descriptor, value);
  return value;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

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
/* harmony import */ var _assets_images_no_saved_video_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/images/no_saved_video.png */ "./src/assets/images/no_saved_video.png");
/* harmony import */ var _assets_images_no_watched_video_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/images/no_watched_video.png */ "./src/assets/images/no_watched_video.png");





new _js_YoutubeClassRoom__WEBPACK_IMPORTED_MODULE_1__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map