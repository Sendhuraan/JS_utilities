## This repo contains solutions for Node-React App.

## How to Run
* Make sure that Node JS (v8.11.3) is installed.
* Clone the repository
* npm install
* In command line - ./jake.sh lint to lint all the code

### Generate All Solutions
-----
**Transpile All Solutions**
In command line - ./jake.sh transpile:all to transpile all solutions (ES6 -> ES5 => JSX -> JS).

**Cross Browser Test All Solutions**
In command line - ./jake.sh browserTests:start to start karma server and capture the browsers.
In command line - ./jake.sh browserTests:runAll to run single solution tests in all the captured browsers.

**Bundle All Solutions**
In command line - ./jake.sh bundle:all to bundle all client JS into single bundle JS.

**Build All Solutions**
In command line - ./jake.sh build:all to bundle all client JS into single bundle JS.


### Generate Unit Solutions
-----
**Transpile Unit Solution**
In command line - ./jake.sh transpile:unit[folderName] to transpile unit solution (ES6 -> ES5 => JSX -> JS).

**Cross Browser Test Unit Solution**
In command line - ./jake.sh browserTests:start to start karma server and capture the browsers.
In command line - ./jake.sh browserTests:runUnit[folderName] to run single solution tests in all the captured browsers.

**Bundle Unit Solution**
In command line - ./jake.sh bundle:unit[folderName] to bundle all client JS into single bundle JS.

**Build Unit Solution**
In command line - ./jake.sh build:unit[folderName] to bundle all client JS into single bundle JS.

### Run Solution
-----
In command line - ./jake.sh serve[folderName] to run solution.