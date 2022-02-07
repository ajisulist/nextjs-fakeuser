<div align="center">

  <h1 align="center">Next.js FakeUser</h1>

  <p align="center">
	A simple app to display user list created using Next.js and randomuser.me API    
    <br />
    <a href="https://ajisulistyo-fakeuser.vercel.app/"><strong>See Demo on Vercel »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
            <li><a href="#test">Run Test</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
	    <a href="#features-list">Features</a>
	    <ul>
	        <li><a href="#basic-feature">Basic Feature</a></li>
	        <li><a href="#added-functionality">Added Functionality</a></li>
	        <li><a href="#bonus-point">Bonus Point</a></li>
      </ul>
	 </li>
    <li><a href="#web-performance-improvement">Web Performace Improvement</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started

Let me guide you on how to run this repo on your personal computer.

### Requirements
-   Working internet connection
-   Minimum **Node 12.22.0** to run this app
-   Few minutes to install dependecies
 
### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:ajisulist/nextjs-fakeuser.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   or if you're using Yarn
   ```sh
   yarn
   ```
<p align="right">(<a href="#top">back to top</a>)</p>

### Test

1. To run test 
   ```sh
   npm run test
   ```
   or if you're using Yarn
   ```sh
   yarn test
   ```
<p align="right">(<a href="#top">back to top</a>)</p>



## Usage

To run this application run this command
   ```js
   npm run dev
   ```
or if you're using yarn
   ```js
   yarn dev;
   ```

And then open http://localhost:3000 on your browser
<p align="right">(<a href="#top">back to top</a>)</p>

## Features List

### Basic Feature
- [x] Get User List
- [x] Filter by keyword (Filter by `keyword` by sending the correct URL Query params)
- [x] Filter by gender (Filter by `gender` by sending the correct URL Query params)
- [x] Sort all column (`sortBy` and `orderBy` by sending the correct URL Query params)
- [x] Pagination
- [x] Implement filter and sort on using API
 
###  Added Functionality
-  [x] Debounce keyword filter (typing on keyword filter will trigger only on API call after idle)
-  [x] Debounce sort (spamming click on table header will trigger only one API call after idle)
-  [x] Debounce pagination (spamming click on next button or prev button will trigger one API call after idle)

### Bonus Point
- [x] Unit Test on utils function, hooks, API, and React Component
- [x] Web Performance improvement (see [Web Performance Improvement](#web-performance-improvement) Section) 

<p align="right">(<a href="#top">back to top</a>)</p>


## Web Performance Improvement
You can see the explanation about how i improve this web page performance improvement here.
    <a href="https://docs.google.com/presentation/d/1duWDLk4IFmhDMkslAkXR-tvcHuoLXJ0hwUvjWzuCS4M/edit?usp=sharing"><strong>See Explanation »</strong></a>

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Aji Sulisty Nugroho - ajisulist@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>
