const sections = document.querySelectorAll('section');
const navSection = document.querySelector('nav');
const header = document.querySelector('header');
const burgerBtn = document.querySelector('.hamburger');
const navBtns = document.querySelectorAll('.nav-btn');
const navItemsBtns = document.querySelectorAll('.nav-btn-m');
const navMobile = document.querySelector('.nav__items--mobile');

const headerBackground = document.querySelector('.header__img');
const headerBtn = document.querySelector('.header__button');
const headerContactBtn = document.querySelector('.header__icons-box-button');
const headerContactCloseBtn = document.querySelector('.header__icons-box-exit');
const headerContactBox = document.querySelector('.header__icons-box');
const headerPopUp = document.querySelectorAll('.popup');
const headerMapsBtn = document.querySelector('.header__maps-btn');
const headerPhoneBtn = document.querySelector('.header__phone-btn');
const phoneNumber = document.querySelector('.phone');
const questionsTemplate = document.querySelectorAll('.header__question');
const mainQuestion = document.querySelector('.header__display-question');

const cardAnimationSwitch = document.querySelector('.about-me__card--hover');

const offerHeaders = document.querySelectorAll('.offer__header');
const offerHideBox = document.querySelector('.offer__list-hide');
const questionBtns = document.querySelectorAll('.fa-circle-question');

let html = document.documentElement;

// start-----------------------------------------------------------------------

const main = () => {
	let i = 1;
	let j = 0;
	let questionsArray = [];

	for (j = 0; j < questionsTemplate.length; j++) {
		questionsArray.push(questionsTemplate[j].innerHTML);
	}

	mainQuestion.classList.add('show-question');

	mainQuestion.textContent = questionsArray[0];
	setTimeout(() => {
		mainQuestion.classList.remove('show-question');
		mainQuestion.classList.add('hide-question');
	}, 4500);

	const loop = setInterval(() => {
		mainQuestion.classList.remove('hide-question');
		mainQuestion.classList.add('show-question');
		if (i > 3) i = 0;
		mainQuestion.textContent = questionsArray[i];
		i++;
		clear();
	}, 6500);

	const clear = () => {
		const time = setTimeout(() => {
			mainQuestion.classList.remove('show-question');
			mainQuestion.classList.add('hide-question');
		}, 4500);
	};
};

// NAV------------------------------------------------------------------------
let navMobileOpen = false;

const handleNav = () => {
	navItemsBtns[0].closest('div').classList.remove('non-visible');
	burgerBtn.classList.toggle('is-active');

	if (navMobileOpen === false) {
		let i = 1;

		navItemsBtns.forEach(btn => {
			btn.classList.remove('nav-btn--animate-off');
			if (i % 2 === 0) {
				btn.classList.add('nav-btn--animate-even');
			} else {
				btn.classList.add('nav-btn--animate-odd');
			}
			i++;
			navMobileOpen = true;
		});
	} else {
		navItemsBtns.forEach(btn => {
			btn.classList.add('nav-btn--animate-off');
			btn.classList.remove('nav-btn--animate-odd');
			btn.classList.remove('nav-btn--animate-even');
			navMobileOpen = false;
		});

		navItemsBtns[0].closest('div').classList.add('non-visible');
	}
};

const navScroll = () => {
	const navWrapper = navSection.childNodes[1];
	if (window.scrollY > 10) {
		navSection.style.position = 'fixed';
		navWrapper.classList.add('nav-scroll');
		navMobile.style.top = '50px';
	} else {
		navWrapper.classList.remove('nav-scroll');
		navSection.style.position = 'absolute';
		navMobile.style.top = '';
	}
};

const dimNav = () => {
	navSection.classList.add('darker');
};
const lightenNav = () => {
	navSection.classList.remove('darker');
};

navItemsBtns.forEach(btn => btn.addEventListener('click', handleNav));

// lighten bgc---------------------------------------------------------------------

const lightenBackground = () => {
	headerBackground.classList.add('brighter');
};

const dimBackground = () => {
	headerBackground.classList.remove('brighter');
};

// contactBox------------------------------------------------------------------------

const opnenContactBox = () => {
	headerContactBox.classList.add('show-contact-box');
	headerContactBtn.style.opacity = '0';
};

const closeContactBox = () => {
	headerContactBox.classList.remove('show-contact-box');
	headerContactBtn.style.opacity = '';
};

// popup------------------------------------------------------------------------

const handlePopUpOne = () => {
	headerPopUp[0].classList.toggle('show-popup');
};

const handlePopUpTwo = () => {
	headerPopUp[1].classList.toggle('show-popup');
};

// phone-copy------------------------------------------------------------------------

const phoneInfo = phoneNumber.nextElementSibling;
phoneInfo.addEventListener('click', () => phoneInfo.classList.remove('show-number'));
const copyPhoneNumber = async () => {
	try {
		await navigator.clipboard.writeText(phoneNumber.textContent);
		phoneInfo.classList.add('show-number');
		console.log('Content copied to clipboard');
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
};
// cards- about-me---------------------------------------------------------------

const cardOne = document.querySelector('.about-me__card--one');
const cardTwo = document.querySelector('.about-me__card--two');
const moveCards = () => {
	cardOne.classList.add('card-one-move');
	cardTwo.classList.add('card-two-move');
};
const restoreCards = () => {
	cardOne.classList.remove('card-one-move');
	cardTwo.classList.remove('card-two-move');
};

// headers - offer---------------------------------------------------------------

const options3 = {
	threshold: 1,
};

const handleOffers = entries => {
	entries.forEach(entry => {
		entry.target.classList.toggle('show-offer-header', entry.isIntersecting);
		if (entry.isIntersecting) offersObserver.unobserve(entry.target)
	});
};

const offersObserver = new IntersectionObserver(handleOffers, options3);

// boxes - offer---------------------------------------------------------------

function handleHideBox() {
	const list = this.nextElementSibling;
	list.classList.toggle('show-offer-box');

	const liArr = [];
	let i = 0;

	list.childNodes.forEach(el => {
		if (el.nodeName === 'LI') {
			liArr.push(el);
		}
	});

	liArr.forEach(li => {
		li.style.transitionDelay = `${i}ms`;
		i += 200;
		li.classList.toggle('show-offer-items');
	});
}

// scrolspy--------------------------------------------

const options = {
	threshold: [0.5],
};

const handleScrollspy = entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const activeNav = document.querySelector(`a[href='#${entry.target.id}']`);
			navBtns.forEach(btn => btn.classList.remove('nav-active'));
			activeNav.classList.add('nav-active');
		}
	});
};

const handleScrollspy2 = entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const activeNav = document.querySelector(`a[href='#${entry.target.id}']`);
			navBtns.forEach(btn => btn.classList.remove('nav-active'));
			activeNav.classList.add('nav-active');
		}
	});
};

const sectionObserver = new IntersectionObserver(handleScrollspy, options);
const headerObserver = new IntersectionObserver(handleScrollspy2, options);

//google-maps---------------------------------------------------------------

function initMap() {
	// The location of Uluru
	const uluru = { lat: -25.344, lng: 131.031 };
	// The map, centered at Uluru
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru,
	});
	// The marker, positioned at Uluru
	const marker = new google.maps.Marker({
		position: uluru,
		map: map,
	});
}

// ------------------------------------------------------------------------

navSection.addEventListener('mouseenter', dimNav);
navSection.addEventListener('mouseleave', lightenNav);
burgerBtn.addEventListener('click', handleNav);

headerMapsBtn.addEventListener('click', handlePopUpOne);
headerPhoneBtn.addEventListener('click', handlePopUpTwo);
phoneNumber.addEventListener('click', copyPhoneNumber);
headerBtn.addEventListener('mouseenter', lightenBackground);
headerBtn.addEventListener('mouseleave', dimBackground);
headerContactBtn.addEventListener('click', opnenContactBox);
headerContactCloseBtn.addEventListener('click', closeContactBox);

cardAnimationSwitch.addEventListener('mouseenter', moveCards);
cardAnimationSwitch.addEventListener('mouseleave', restoreCards);

questionBtns.forEach(question => question.addEventListener('click', handleHideBox));

sections.forEach(section => {
	sectionObserver.observe(section);
});
headerObserver.observe(header);

offerHeaders.forEach(header => {
	offersObserver.observe(header);
});

document.addEventListener('DOMContentLoaded', main);
window.addEventListener('scroll', navScroll);
window.initMap = initMap;
// html.style.setProperty('--light-dark', '#f7f7f7');
