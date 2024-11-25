import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { QuestionsService } from './services/questions.service';
import { Question } from './models/question';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: StorageService, private questionService: QuestionsService) { }

  async ngOnInit() {
    await this.storage.init();
  }

  async addAllQuestions(questions: Question[]) {
    await this.questionService.addAllQuestions(questions);
  }


  // Generate 50 objects of this.
  // Each of them is a question, so isList and isPicture is false and path is empty.
  // Order starts at 1, with the most easy one.
  // The categoryId is "CiW0bBFO9DwPBISnCF2z"
  // The questions are about simple math.
  // So generate each time a new simple math question in property question and the answer property answer.
  // The difficulty should be going up. BUt that doesn't mean question 50 should be of difficulty masters degree Math. I think the difficulty of question 50 could be like "5 to the power 3"
  // One important thing is that the question should reabable in 1 maximum 2 seconds. So no long questions
  generate50QuestionsForMath() {
    const questions: Question[] = [
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 2 + 2?", "4", "", 1, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 5 - 3?", "2", "", 2, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 3 × 2?", "6", "", 3, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 8 ÷ 4?", "2", "", 4, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 9 + 7?", "16", "", 5, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 15 - 6?", "9", "", 6, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 4 × 3?", "12", "", 7, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 16 ÷ 2?", "8", "", 8, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 11 + 8?", "19", "", 9, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 20 - 9?", "11", "", 10, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 7 × 2?", "14", "", 11, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 18 ÷ 3?", "6", "", 12, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 13 + 6?", "19", "", 13, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 25 - 12?", "13", "", 14, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 5 × 5?", "25", "", 15, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 36 ÷ 6?", "6", "", 16, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 20 + 15?", "35", "", 17, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 30 - 17?", "13", "", 18, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 8 × 3?", "24", "", 19, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 48 ÷ 8?", "6", "", 20, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 15 + 18?", "33", "", 21, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 50 - 22?", "28", "", 22, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 6 × 6?", "36", "", 23, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 64 ÷ 8?", "8", "", 24, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 25 + 19?", "44", "", 25, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 60 - 33?", "27", "", 26, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 7 × 7?", "49", "", 27, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 81 ÷ 9?", "9", "", 28, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 40 + 22?", "62", "", 29, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 90 - 45?", "45", "", 30, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 9 × 8?", "72", "", 31, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 100 ÷ 4?", "25", "", 32, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 50 + 36?", "86", "", 33, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 120 - 60?", "60", "", 34, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 11 × 11?", "121", "", 35, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 144 ÷ 12?", "12", "", 36, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 75 + 50?", "125", "", 37, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 200 - 99?", "101", "", 38, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 12 × 12?", "144", "", 39, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 225 ÷ 15?", "15", "", 40, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 90 + 45?", "135", "", 41, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 250 - 123?", "127", "", 42, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 15 × 8?", "120", "", 43, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 400 ÷ 20?", "20", "", 44, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 125 + 75?", "200", "", 45, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 500 - 222?", "278", "", 46, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 5³?", "125", "", 47, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is √49?", "7", "", 48, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 3² + 4²?", "25", "", 49, false, false),
      new Question("CiW0bBFO9DwPBISnCF2z", "What is 5 × 2²?", "20", "", 50, false, false),
    ];
  }


  // Generate 50 new objects.
  // Each of them is a picture question, so isList is false and isPicture is true and path is filled in but question is empty.
  // Order starts at 1, with the most easy one.
  // The categoryId is "EW0sgwHFCRVTfuAIHqj7"
  // The questions are pictures of movie covers they need to guess the name of the movie.
  // So generate each time a new name of a movie and put the answer property answer.
  // The difficulty should be going up. BUt that doesn't mean question 50 should be of extreme difficulty
  // The path property is always the same syntax: "animatiefilmcovers/{answer}.png"
  generate50PictureQuestionsForAnimationMovieCover() {
    const pictureQuestions: Question[] = [
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Lion King", "animatiefilmcovers/TheLionKing.png", 1, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Toy Story", "animatiefilmcovers/ToyStory.png", 2, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Finding Nemo", "animatiefilmcovers/FindingNemo.png", 3, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Shrek", "animatiefilmcovers/Shrek.png", 4, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Frozen", "animatiefilmcovers/Frozen.png", 5, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Incredibles", "animatiefilmcovers/TheIncredibles.png", 6, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Moana", "animatiefilmcovers/Moana.png", 7, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Coco", "animatiefilmcovers/Coco.png", 8, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Ratatouille", "animatiefilmcovers/Ratatouille.png", 9, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Up", "animatiefilmcovers/Up.png", 10, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "WALL-E", "animatiefilmcovers/WALL-E.png", 11, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Tangled", "animatiefilmcovers/Tangled.png", 12, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Zootopia", "animatiefilmcovers/Zootopia.png", 13, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Jungle Book", "animatiefilmcovers/TheJungleBook.png", 14, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Aladdin", "animatiefilmcovers/Aladdin.png", 15, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Beauty and the Beast", "animatiefilmcovers/BeautyAndTheBeast.png", 16, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Mulan", "animatiefilmcovers/Mulan.png", 17, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Pocahontas", "animatiefilmcovers/Pocahontas.png", 18, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Brave", "animatiefilmcovers/Brave.png", 19, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Little Mermaid", "animatiefilmcovers/TheLittleMermaid.png", 20, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Big Hero 6", "animatiefilmcovers/BigHero6.png", 21, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Cars", "animatiefilmcovers/Cars.png", 22, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Inside Out", "animatiefilmcovers/InsideOut.png", 23, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Monsters, Inc.", "animatiefilmcovers/MonstersInc.png", 24, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "A Bug's Life", "animatiefilmcovers/ABugsLife.png", 25, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Hercules", "animatiefilmcovers/Hercules.png", 26, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Hunchback of Notre Dame", "animatiefilmcovers/TheHunchbackOfNotreDame.png", 27, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Tarzan", "animatiefilmcovers/Tarzan.png", 28, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Treasure Planet", "animatiefilmcovers/TreasurePlanet.png", 29, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Atlantis: The Lost Empire", "animatiefilmcovers/AtlantisTheLostEmpire.png", 30, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Lilo & Stitch", "animatiefilmcovers/LiloAndStitch.png", 31, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Emperor's New Groove", "animatiefilmcovers/TheEmperorsNewGroove.png", 32, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Good Dinosaur", "animatiefilmcovers/TheGoodDinosaur.png", 33, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Secret Life of Pets", "animatiefilmcovers/TheSecretLifeOfPets.png", 34, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Sing", "animatiefilmcovers/Sing.png", 35, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Kung Fu Panda", "animatiefilmcovers/KungFuPanda.png", 36, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Madagascar", "animatiefilmcovers/Madagascar.png", 37, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The Croods", "animatiefilmcovers/TheCroods.png", 38, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Ice Age", "animatiefilmcovers/IceAge.png", 39, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "How to Train Your Dragon", "animatiefilmcovers/HowToTrainYourDragon.png", 40, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Despicable Me", "animatiefilmcovers/DespicableMe.png", 41, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Minions", "animatiefilmcovers/Minions.png", 42, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Happy Feet", "animatiefilmcovers/HappyFeet.png", 43, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Bolt", "animatiefilmcovers/Bolt.png", 44, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Chicken Run", "animatiefilmcovers/ChickenRun.png", 45, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Over the Hedge", "animatiefilmcovers/OverTheHedge.png", 46, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Cloudy with a Chance of Meatballs", "animatiefilmcovers/CloudyWithAChanceOfMeatballs.png", 47, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Hotel Transylvania", "animatiefilmcovers/HotelTransylvania.png", 48, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "The LEGO Movie", "animatiefilmcovers/TheLEGOMovie.png", 49, true, false),
      new Question("EW0sgwHFCRVTfuAIHqj7", "", "Secret of NIMH", "animatiefilmcovers/SecretOfNIMH.png", 50, true, false),
    ];

  }


  // Generate 50 new objects.
  // Each of them is a list question, so isList is true and isPicture is false and path is empty but question is filled in.
  // Order starts at 1, with the most easy one.
  // The categoryId is "RiE9soitDp6MxWjvp8ny"
  // The questions are 4 hints about a movie, but NO animationmovie, they need to guess the name of the movie. 
  // So generate each time for a movie a question which has this syntax: 4 hints divided by a semicolon.
  // PUt the answers and question in dutch
  // Put the name of the movie in the answer property.
  // The difficulty should be going up. BUt that doesn't mean question 50 should be of extreme difficulty
  generate50ListQuestionsForMovies() {
    const listQuestions: Question[] = [
      new Question("RiE9soitDp6MxWjvp8ny", "Grote boot; Scheepsramp; Leonardo DiCaprio; IJskoud", "Titanic", "", 1, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Hobbit; Ring; Vrienden; Berg", "The Lord of the Rings", "", 2, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Magie; Brief; Zweinstein; Harry", "Harry Potter", "", 3, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Russel Crowe; Rome; Arena; Strijd", "Gladiator", "", 4, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Schurk; Gotham; Vleermuis; Held", "The Dark Knight", "", 5, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Woestijn; Vrachtwagen; Chaos; Apocalyps", "Mad Max: Fury Road", "", 6, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Schip; Kapitein; Piraat; Somalië", "Captain Phillips", "", 7, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Dinosaurus; Pretpark; Chaos; Vlucht", "Jurassic Park", "", 8, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Auto; Crimineel; Benzine; Familie", "Fast & Furious", "", 9, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Eiland; Bal; Strand; Alleen", "Cast Away", "", 10, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Boerderij; Liefde; Vliegtuigen; Dagboek", "The Notebook", "", 11, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Piano; Oorlog; Getto; Overleven", "The Pianist", "", 12, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Wetenschapper; Tijdmachine; Avontuur; 1985", "Back to the Future", "", 13, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Geheugen; Droom; Slaap; Cobb", "Inception", "", 14, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Jack; Bank; Plan; Overval", "Ocean's Eleven", "", 15, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Ziekenhuis; Verklaring; Dood; Moeder", "The Sixth Sense", "", 16, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Boksring; Handschoenen; Trainer; Philadelphia", "Rocky", "", 17, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Vliegtuig; Tom Cruise; Gevaar; Piloot", "Top Gun", "", 18, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Drugs; Heisenberg; Meth; Kook", "Breaking Bad (film)", "", 19, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Bank; Ontsnappen; Vriendschap; Hoop", "The Shawshank Redemption", "", 20, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Maaltijd; Kwartier; Gangster; Dans", "Pulp Fiction", "", 21, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Oorlog; Normandië; Soldaat; Missie", "Saving Private Ryan", "", 22, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Tijger; Boot; Oceaan; Overleving", "Life of Pi", "", 23, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Hotel; Skiën; Bijl; Overlook", "The Shining", "", 24, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Berlijn; Muur; Spion; Koude Oorlog", "Bridge of Spies", "", 25, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Ruimte; Helm; Robot; Mars", "The Martian", "", 26, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Goud; Tovenaar; Dwergen; Hobbit", "The Hobbit", "", 27, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Sniper; Amerika; Oorlog; Irak", "American Sniper", "", 28, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Boxing; Tactiek; Collage; Prestige", "Million Dollar Baby", "", 29, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Ruimte; Aliens; Uitschakelen; Kolonisten", "Alien", "", 30, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Wraak; Tarantino; Zwaard; Bruid", "Kill Bill", "", 31, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Oorlog; Tank; Nazi; Fury", "Fury", "", 32, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "President; Lincoln; Burgeroorlog; Vrijheid", "Lincoln", "", 33, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Zuid-Afrika; Rugby; Nelson Mandela; Vrijheid", "Invictus", "", 34, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Kans; Waardigheid; Scheikunde; Onrecht", "The Pursuit of Happyness", "", 35, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Gangs; New York; Fictie; Fictie", "Gangs of New York", "", 36, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Titanium; Vlucht; Rede; Woud", "Children of Men", "", 37, false, true),
      new Question("RiE9soitDp6MxWjvp8ny", "Prison; Long; Battlezone; free-Radical", "Shoshawks", "", 40, false, true),
    ];

  }
}

