

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Car Gauges</h3>

  <p align="center">
  Displays anolog and ECU data 
    <br />
    <br />
    

  </p>
   · <a href="https://github.com/rryanh/Car-Gauges">Report Bug</a>
  <br/>
   · <a href="https://github.com/rryanh/Car-Gauges">Request Feature</a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![nice](https://user-images.githubusercontent.com/23712152/157533904-d2c9e948-e14b-4959-9013-53a431219b9f.PNG)



Started as a simple project to display oil temperature, pressure, and boost. The project reads analog data using an Arduino device that communicates with the node server over USB to exchange data. Data is retrieved from the node server using an angular app to display the gauges/content.


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- TypeScript
- HTML
- CSS
- Angular


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- Angular
  ```sh
  npm install -g @angular/cli
  ```
### Installation

2. Clone the repo
   ```sh
   git clone https://github.com/rryanh/Car-Gauges.git
   ```
3. Install NPM packages in both /server and /client
   ```sh
   npm install
   ```
4. Build and serve client 
   ```sh
   cd client
   ng serve
   ```
5. Run the sever 
   ```sh
   cd server
   npm start
   ```
 6. Open http://localhost:4200/ and set the window size to 1920 x 1080
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] onClick resets min / max values
- [ ] connect to ECU
- [ ] logging & bluetooth transfer (?)
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ryan Hughes - ryanhuga@gmail.com

Project Link: [Here](https://github.com/rryanh/Car-Gauges)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments


- [Othneil Drew](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/rryanh/2D-WebGL-Game.svg?style=for-the-badge
[contributors-url]: https://github.com/rryanh/2D-WebGL-Game/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rryanh/2D-WebGL-Game.svg?style=for-the-badge
[forks-url]: https://github.com/rryanh/2D-WebGL-Game/network/members
[stars-shield]: https://img.shields.io/github/stars/rryanh/2D-WebGL-Game.svg?style=for-the-badge
[stars-url]: https://github.com/rryanh/2D-WebGL-Game/stargazers
[issues-shield]: https://img.shields.io/github/issues/rryanh/2D-WebGL-Game.svg?style=for-the-badge
[issues-url]: https://github.com/rryanh/2D-WebGL-Game/issues
[license-shield]: https://img.shields.io/github/license/rryanh/2D-WebGL-Game.svg?style=for-the-badge
[license-url]: https://github.com/rryanh/2D-WebGL-Game/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ryan-hughes-b27679184
