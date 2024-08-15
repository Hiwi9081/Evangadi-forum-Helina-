import React from 'react'
import './About.css'
import Logo from '../../assets/bg.jpg'

function About() {
  return (
    <div className="login__about">
          <p className="about">About</p>
          <div className="about__title">
            <h1>Evangadi Networks Q & A</h1>
          </div>
          <div className="about__Discription">
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <br />
            <p>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <br />
            <br />
          </div>
          <button>HOW IT WORKS</button>
        </div> 
  )
}

export default About;
