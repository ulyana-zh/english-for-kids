export default class Table {
  constructor({ category, word, translation, image, audio}) {
    this.category = category,
    this.word = word,
    this.translation = translation,
    this.image = image,
    this.audio = audio,
    this.data = this.collectCounts(),
    this.trained,
    this.correct,
    this.incorrect,
    this.percent;
  }

  generateHeadOfTheTable() {
    this.table = document.createElement('table');
    this.head = document.createElement('thead');
    this.table.append(this.head);
    this.head.innerHTML = `   
         <tr>    
           <th>Categories<div class="sort-icon"></div></th>  
           <th>Words<div class="sort-icon"></div></th> 
           <th>Translation<div class="sort-icon"></div></th> 
           <th>Trained<div class="sort-icon"></div></th> 
           <th>Correct<div class="sort-icon"></div></th> 
           <th>Incorrect<div class="sort-icon"></div></th>  
           <th>%<div class="sort-icon"></div></th>   
          </tr> 
        `;

    return this.table;
  }

  collectCounts() {
    this.trained = +(localStorage.getItem(`${this.word}`));
    this.correct = +(localStorage.getItem(`${this.word}-right`));
    this.incorrect = +(localStorage.getItem(`${this.word}-wrong`));
    this.percent = (this.correct * 100) / (this.correct + this.incorrect);
    if (!Number.isNaN(this.percent)) {
      this.percent = Math.round(this.percent);
    } else {
      this.percent = 0;
    }
    return this.trained, this.correct, this.incorrect, this.percent;
  }

  generateRow() {
    this.collectCounts();

    const row = document.createElement('tr');
    row.innerHTML = `
         <td>${this.category.replace(/-/g, ' ')}</td>
         <td>${this.word}</td>
         <td>${this.translation}</td>
         <td>${this.trained}</td>
         <td>${this.correct}</td>
         <td>${this.incorrect}</td>
         <td>${this.percent}%</td>
        `;
    return row;
  }
}
