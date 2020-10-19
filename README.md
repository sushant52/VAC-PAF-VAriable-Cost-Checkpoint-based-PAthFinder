## 📈 VACC-PAF : VAriable Cost Checkpoint based PAthFinder
***
### 📃 About
**VACC-PAF** is a PathFinder sandbox which uses A* graph algorithm to find shortest path between two points. 
It allows user to create their own grid full of hurdles and obstacles of their wish, through which the algorithm works to find a path. Many unique functionalities such as custom weighted cells and checkpoints are also provided to the user. This project is built using ReactJS and p5.js libraries. [Visit the website](https://sushant52.github.io/VAC-PAF-VAriable-Cost-Checkpoint-based-PAthFinder/) to play around with the sandbox. 
Have a look at the PathFinder in action with some mud cells and 2 checkpoints, below!

![ExampleGIF](https://media.giphy.com/media/BmZNxzUNv4DH1rOolC/giphy.gif)

### 💡 The Idea
Many similar pathfinding applications do exist online. While exploring these, a common trait that I observed was that the user was not given much control over the whole pathfinding process. One was limited to the settings fixed by the developer, which limited the usability of such applications. This project was created in an attempt to hand over many control parameters of the pathfinding process, to the user.

### 🤔 How is this different ?
Well, if there are **sooo** many similar applications, how does this stand out from the crowd?
Here's how :-
* **6️⃣ Custom Grid Sizes**: Instead of fixing the grid size to a value, the user can input whatever value he/she wants. Smaller grid sizes generate a lot of cells, thus providing more area for user to play with !
* **🕒 Custom Timer**: *Woah*, was that visualization too fast for your eyes? Fear not. Just increase the timer value during initialization and the visualization will slow down !
* **🚫 Disable Visualizer**: Tired of waiting for the visualization to complete? Do you just want to get to the final path? Well, You can! Disable the option to visualize path and you get the final path in an instant.
* **🟪 Custom Cell Types**: Obstacles need not be only walls. They can be anything, ranging from slippery ice, thorny bushes or even thick mud! You can add your own obstacles from *New Cell* button. Give a name, cost and color, and create your own obstacle. The cost here is similar to the edge weight in weighted graphs and represent how hard is it to traverse the cell as compared to the normal whitespace with cost 1.
* **🚩 Checkpoints**: Say, you want to go to theatre but need to pick some friends along the way as well. You want to find the shortest path from your home to theatre such that the path also goes through all your friends' homes. VACC-PAF is ready for such situations as well! Instead of just going from start to end, you can force the pathfinder to **specifically** go through certain cells or *Checkpoints* by adding at most three of the provided Checkpoint cells.

### 🖥️Run on your local device
Simply run
```bash
npm install
npm start
```
on the terminal to run the project on your local machine.

### 🔮 Future Ideas
* Currently, the application works on PC only. Support for mobile devices is a major goal.
* Currently, the pathfinder works on A* graph algorithm only. In future, multiple algorithms such as dfs and Dijkstra Algorithms can be implemented.
* More user control can be provided by adding the options of using various heuristics in A* algorithm and adding option to disable diagonal movement in the path.

### 🐞 Bugs
This is my first time with NodeJS and React, so some bugs might have bypassed my rookie defence systems. Feel free to report any bugs and/or unwanted behaviours if you face any.


