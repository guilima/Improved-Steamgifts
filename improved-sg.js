// ==UserScript==
// @name          Improved Steamgifts
// @namespace     improvedSG
// @version       1.0.2
// @run-at        document-start
// @include       *steamgifts.com*
// @description   Improves steamgifts.com user experience
// @author        Guilherme Lima
// @require       https://raw.githubusercontent.com/guilima/Improved-Steamgifts/master/improved-sg.style.js
// @downloadURL   https://raw.githubusercontent.com/guilima/Improved-Steamgifts/master/improved-sg.js
// @updateURL     https://raw.githubusercontent.com/guilima/Improved-Steamgifts/master/improved-sg.js
// @homepage      https://github.com/guilima/Improved-Steamgifts
// @grant         none
// @license       MIT
// ==/UserScript==

(function() {
  'use strict';
  let currentPage = 1,
    lastGiveawayRow,
    loadMoreBtn;
  const entryGiveawayBtnString = `<button class="entry-giveaway"><i class="fa fa-plus-circle" style="vertical-align: text-bottom;"></i> Enter Giveaway</button>&nbsp;`,
    loadMoreBtnString = `<div class="page__description__display-state text-center"><button class="load-more-giveaway"><i></i> Load more</button></div>`,
    queryParamType = new URL(window.location.href).searchParams.get('type');

  document.addEventListener('DOMContentLoaded', function() {
    lastGiveawayRow = document.querySelector(
      'div[style*="padding-top: 35px; padding-bottom: 10px; display: flex; justify-content: center;"]'
    );
    document.querySelectorAll('.giveaway__row-inner-wrap.is-faded').forEach(e => e.parentNode.remove());
    const giveaways = [...document.querySelectorAll('.giveaway__row-outer-wrap')];
    lastGiveawayRow.insertAdjacentHTML('beforebegin', loadMoreBtnString);
    loadMoreBtn = document.querySelector('.load-more-giveaway');
    giveaways.forEach(giveaway => {
      const giveawayGameHeading = giveaway.querySelector('.giveaway__heading');
      giveaway.querySelector('.giveaway__hide').removeAttribute('data-popup');
      giveawayGameHeading.insertAdjacentHTML('afterbegin', entryGiveawayBtnString);
    });
    loadMoreBtn.addEventListener('click', loadMore);
    document
      .querySelectorAll('.entry-giveaway')
      .forEach(btnGiveaway => btnGiveaway.addEventListener('click', entryGiveaway));
    document
      .querySelectorAll('.giveaway__hide')
      .forEach(btnHideGiveaway => btnHideGiveaway.addEventListener('click', hideGiveaway));
  });

  function entryGiveaway() {
    /* jshint validthis: true */
    const token = document.querySelector("input[name='xsrf_token']").value,
      isInsert = !this.classList.contains('delete'),
      iconClass = this.firstChild.classList,
      myPointsElem = document.querySelector('.nav__points'),
      myPoints = parseFloat(myPointsElem.innerText.match(/[0-9*]/g).join('')),
      gamePoints = parseFloat(
        this.parentNode
          .querySelector('.giveaway__heading__thin:last-of-type')
          .innerText.match(/[0-9*]/g)
          .join('')
      ),
      gameName = this.parentNode.querySelector('.giveaway__heading__name').innerText,
      gameCode = this.parentNode
        .querySelector('.giveaway__heading__name')
        .getAttribute('href')
        .split('/')[2],
      action = isInsert ? 'entry_insert' : 'entry_delete',
      bgColor = isInsert ? '#c9b76a' : '#9ac96a',
      textColor = isInsert ? '#505302' : '#305302',
      formData = new FormData();
    formData.append('xsrf_token', token);
    formData.append('code', gameCode);
    formData.append('do', action);
    this.firstChild.className = '';
    this.setAttribute('disabled', '');
    iconClass.add('fa', 'fa-refresh', 'fa-spin');
    fetch('https://www.steamgifts.com/ajax.php', {
      method: 'POST',
      credentials: 'same-origin',
      body: new URLSearchParams(formData),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    })
      .then(() => {
        console.info(`${gameName} - ${action}`);
        this.style.backgroundColor = bgColor;
        this.style.color = textColor;
        iconClass.add('fa');
        iconClass.toggle('fa-minus-circle', isInsert);
        this.classList.toggle('delete');
        myPointsElem.innerText = isInsert ? myPoints - gamePoints : myPoints + gamePoints;
      })
      .catch(error => console.error('Error:', error))
      .then(() => {
        iconClass.add('fa', 'fa-plus-circle');
        iconClass.remove('fa-spin');
        this.removeAttribute('disabled');
      });
  }

  function hideGiveaway() {
    /* jshint validthis: true */
    const game = this.closest('.giveaway__row-outer-wrap'),
      gameName = game.querySelector('.giveaway__heading__name').innerText,
      formData = new FormData();
    formData.append('xsrf_token', document.querySelector("input[name='xsrf_token']").value);
    formData.append('game_id', game.getAttribute('data-game-id'));
    formData.append('do', 'hide_giveaways_by_game_id');
    fetch('https://www.steamgifts.com/ajax.php', {
      method: 'POST',
      credentials: 'same-origin',
      body: new URLSearchParams(formData),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    })
      .then(() => {
        console.info(`${gameName} - Removed`);
        game.parentNode.removeChild(game);
      })
      .catch(error => console.error('Error:', error));
  }

  function loadMore() {
    const loadingClass = ['fa', 'fa-refresh', 'fa-spin', 'fa-2x', 'fa-fw'],
      type = queryParamType ? `&type=${queryParamType}` : '';
    loadMoreBtn.setAttribute('disabled', '');
    loadMoreBtn.firstChild.classList.add(...loadingClass);
    fetch(`https://www.steamgifts.com/giveaways/search?page=${currentPage}${type}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
      .then(res => {
        return res.text();
      })
      .then(function(data) {
        currentPage++;
        console.info(`Page ${currentPage} - loaded`);
        let crawlerData = data.replace(/\s+/g, ' '); //remove big whitespaces
        crawlerData = crawlerData.substring(crawlerData.indexOf('<div class="page__heading">')); //remove before
        crawlerData = crawlerData.substring(0, crawlerData.indexOf('<div class="pagination">')); //remove after
        crawlerData = crawlerData.replace(
          /<div> <div class="giveaway__row-outer-wrap"/,
          `<div class="giveaway-page-${currentPage}"> <div class="giveaway__row-outer-wrap`
        ); // add id currentPage
        crawlerData = crawlerData.replace(
          /<h2 class="giveaway__heading"> <a class="giveaway__heading__name"/g,
          `<h2 class="giveaway__heading">${entryGiveawayBtnString}<a class="giveaway__heading__name"`
        ); // add button
        crawlerData = crawlerData.replace(/data-popup="popup--hide-games"/g, ''); //remove popup
        lastGiveawayRow.insertAdjacentHTML('beforebegin', crawlerData);

        loadMoreBtn.firstChild.classList.remove(...loadingClass);
        loadMoreBtn.removeAttribute('disabled');

        //remove load button
        if (
          !crawlerData ||
          document.querySelectorAll(`.giveaway-page-${currentPage} .giveaway__row-inner-wrap`).length <= 49
        ) {
          lastGiveawayRow.insertAdjacentHTML(
            'beforebegin',
            '<p style="text-align: center;">No more games. :(</p>'
          );
          loadMoreBtn.remove();
          loadMoreBtn = null;
        }

        document
          .querySelectorAll(`.giveaway-page-${currentPage} .giveaway__row-inner-wrap.is-faded`)
          .forEach(e => e.parentNode.remove());
        document
          .querySelectorAll(`.giveaway-page-${currentPage} .entry-giveaway`)
          .forEach(btnGiveaway => btnGiveaway.addEventListener('click', entryGiveaway));
        document
          .querySelectorAll(`.giveaway-page-${currentPage} .giveaway__hide`)
          .forEach(btnHideGiveaway => btnHideGiveaway.addEventListener('click', hideGiveaway));
      });
  }

  let ticking = false;

  window.addEventListener('scroll', function() {
    if (
      !loadMoreBtn ||
      loadMoreBtn.getBoundingClientRect().top >= 2000 ||
      loadMoreBtn.hasAttribute('disabled')
    ) {
      return;
    }

    if (!ticking) {
      window.requestAnimationFrame(function() {
        loadMore();
        ticking = false;
      });
      ticking = true;
    }
  });
})();
