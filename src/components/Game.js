/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import '../style/game.css';
import daedon from '../assets/daedon.jpg'
import giga from '../assets/giga.jpg'
import hampter from '../assets/hampter.jpg'
import juan from '../assets/juan.png'
import obamna from '../assets/obamna.png'
import politics from '../assets/politics.jpg'
import pondsage from '../assets/pondsage.jpg'
import sickos from '../assets/sickos.png'
import slug from '../assets/slug.png'
import ted from '../assets/ted.jpg'
import terry from '../assets/terry.jpg'
import vr from '../assets/vr.jpg'
import garloid from '../assets/garloid.png'

function Game(props) {
    const [list, setList] = useState(props.characters);
    const {increaseScore, increaseTally, resetTally, increaseLosses} = props;
    const images = {obamna, juan, hampter, slug, giga, sickos, terry, vr, ted, politics, daedon, pondsage, garloid}

    function shuffleList(clone) {
        for (let i = clone.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clone[i], clone[j]] = [clone[j], clone[i]];
        }
        setList(clone);
    }

    function resetToggles() {
        const clone = structuredClone(list);
        clone.forEach(item => {
            item.toggle = false;
        });
        shuffleList(clone);
    }
    
    function handleClick(e) {
        if (list[e.target.dataset.index].toggle === false) {
            const clone = structuredClone(list);
            clone[e.target.dataset.index].toggle = true;
            const check = checkforWin(clone);
            shuffleList(clone);
            increaseTally();
            if (check) {
                resetTally();
                increaseScore();
            }
        } else {
            resetToggles();
            resetTally();
            increaseLosses();
        }
    }

    function checkforWin(clone) {
        if (clone.every(item => item.toggle === true)) {
            clone.forEach(item => {
                item.toggle = false;
            });
            return true;
        }
    }
    
    return (
        <div id="main">
            {list.map((item, index) => {
                return <div data-index={index} key={item.key} className='card' onClick={handleClick}>
                <img src={images[item.name]} />
                <div>{item.name + ' ' + item.toggle}</div>
            </div>
            })}
        </div>
    )
}

export default Game;