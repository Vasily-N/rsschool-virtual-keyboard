import Keyboard from './Keyboard';
import './styles.scss';
import keyBoardDesign from './design.json';

const createTitle = () => {
  const pTitle = document.createElement('p');
  pTitle.innerHTML = 'Virtual Keyboard<br>Windows<br>Ctrl+Alt to switch input language';
  pTitle.id = 'title';
  pTitle.classList.add('text');
  return pTitle;
};

const fragment = document.createDocumentFragment();

const baseDIv = document.createElement('div');
baseDIv.id = 'wrapper';
baseDIv.appendChild(createTitle());
baseDIv.appendChild(new Keyboard(keyBoardDesign).getLayout());

fragment.appendChild(baseDIv);

document.body.appendChild(fragment);
