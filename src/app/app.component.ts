import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { QuestionsService } from './services/questions.service';
import { Question } from './models/question';
import { CategoryService } from './services/category.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: StorageService, private questionService: QuestionsService, private catService: CategoryService) { }

  async ngOnInit() {
    await this.storage.init();
    this.catService.getAllCategories().then(res => {
    })

  }

  async addAllQuestions(questions: Question[]) {
    await this.questionService.addAllQuestions(questions);
  }


  // export class Question {
  //   id?: string;
  //   categoryId: string;
  //   question: string;
  //   answer: string;
  //   path: string;
  //   order: number;
  //   isList:boolean;
  //   isPicture:boolean;

  //   constructor(categoryId:string,question:string,answer:string,path:string,order:number,isPicture:boolean,isList:boolean
  //   ) {
  //     this.categoryId = categoryId;
  //     this.question = question;
  //     this.answer = answer;
  //     this.path = path;
  //     this.isList = isList;
  //     this.isPicture = isPicture;
  //     this.order = order;
  //   }

  // }

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

  generate50PictureQuestionsForMovies() {
    const movies = [
      "Titanic", "The Godfather", "The Shawshank Redemption", "Pulp Fiction", "Inception", "The Dark Knight",
      "Schindler's List", "Forrest Gump", "Star Wars", "Harry Potter", "The Lord of the Rings", "Avatar",
      "The Matrix", "Jurassic Park", "Gladiator", "The Lion King", "Frozen", "Toy Story", "Finding Nemo",
      "The Avengers", "Spider-Man", "Iron Man", "Captain America", "Black Panther", "The Hunger Games",
      "Twilight", "Pirates of the Caribbean", "The Hobbit", "The Silence of the Lambs", "Saving Private Ryan",
      "Braveheart", "Interstellar", "La La Land", "The Great Gatsby", "The Social Network", "Cinderella",
      "Beauty and the Beast", "Aladdin", "Up", "Wall-E", "Shrek", "Minions", "The Incredibles", "Moana",
      "Coco", "Joker", "Bohemian Rhapsody", "Frozen 2", "Wonder Woman", "Doctor Strange"
    ];

    const categoryId = "AROc3xeHjkCWTgI5boNq";
    const questions: Question[] = movies.map((movie, index) => {
      const order = index + 1; // Order starts at 1
      const path = `films/${movie}.png`;
      return new Question(categoryId, "", movie, path, order, true, false);
    });
    this.addAllQuestions(questions)
  }

  generate50PictureQuestionsForCarBrands() {
    const carBrands = [
      "BMW", "Mercedes-Benz", "Audi", "Toyota", "Ford", "Honda", "Nissan", "Opel", "Citroën", "Volkswagen", "Volvo", "Hyundai",
      "Kia", "Peugeot", "Renault", "Fiat", "Subaru", "Mazda", "Lexus", "Abarth", "Porsche", "Jaguar", "Chevrolet",
      "Mitsubishi", "Tesla", "Daewoo", "Ferrari", "Lamborghini", "Aston-Martin", "Bentley", "Rolls-Royce", "Bugatti",
      "McLaren", "Alfa-Romeo", "Cadillac", "Dodge", "Corvette", "Koenigsegg", "Infiniti", "Maserati", "Suzuki", "Seat",
      "Skoda", "Mini-cooper", "Saab", "Subaru", "Mustang", , "Pontiac", "Buick", "Smart"
    ];

    const categoryId = "kt9zIP8tqjIuAqhjn6Rx";
    const questions: Question[] = carBrands.map((brand, index) => {
      if (brand) {
        const order = index + 1; // Order starts at 1
        let lcbrand = brand.toLowerCase();
        const path = `automerken/${lcbrand}.png`;
        return new Question(categoryId, "", brand, path, order, true, false);
      } else {
        const order = index + 1; // Order starts at 1
        const path = `automerken/${"xx"}.png`;
        return new Question(categoryId, "", "x", path, order, true, false);
      }

    });
    this.addAllQuestions(questions)
  }

  generate50PictureQuestionsForAnimals() {
    const animals = [
      "Hond", "Kat", "Paard", "Koe", "Schaap", "Varken", "Kip", "Konijn", "Goudvis", "Olifant",
      "Leeuw", "Tijger", "Zebra", "Giraf", "Pinguïn",
      "Flamingo", "Dolfijn", "Schildpad", "Kameleon", "Toekan", "Alpaca", "Stekelvarken", "Wasbeer", "Egel", "Bever",
      "Miereneter", "Reuzenpanda", "Zwaardvis", "Kolibrie", "Ringstaartmaki", "Emoe", "Zeehond", "IJsbeer", "Coati", "Walrus",
      "Tapir", "Mara", "Capibara", "Gibbon", "Bonobo", "Axolotl", "Quokka", "Narwal", "Kakapo", "Manenwolf",
      "Fossa", "Blauwvinvis", "Saiga-antilope", "Shoebill", "Tarsier"
    ];

    const categoryId = "5XDWW972sx75v0I7SNDz";
    const questions: Question[] = animals.map((animal, index) => {
      const order = index + 1; // Order starts at 1
      const path = `dieren/${animal}.png`;
      return new Question(categoryId, "", animal, path, order, true, false);
    });

  }

  generate50PictureQuestionsForMonuments() {
    const monuments = [
      "Eiffeltoren", "Colosseum", "Vrijheidsbeeld", "Taj Mahal", "Sagrada Familia", "Notre-Dame", "Big Ben",
      "Tower Bridge", "Palace of Versailles", "Louvre Museum", "De Grote Muur van China", "Piramide van Giza",
      "Acropolis van Athene", "Christus de Verlosser", "Stonehenge", "Angkor Wat", "Brandenburger Tor", "Sydney Opera House",
      "Neuschwanstein Castle", "Mount Fuji", "Petra", "Château de Chambord", "Red Square", "Alhambra", "Pantheon",
      "Parthenon", "Grand Canyon", "Mount Rushmore", "Rijksmuseum", "Chichen Itza", "Blue Mosque", "Basilica di San Pietro",
      "Great Barrier Reef", "Moai Beelden", "Easter Island", "Palace of Potala", "Mount Kilimanjaro", "Banff National Park",
      "Burg Eltz", "Piramide van Teotihuacan", "Kremlin", "Machu Picchu", "Baalbek Ruins"

    ];

    const categoryId = "u4bSDQHebrdSR4PPN8xS";
    const questions: Question[] = monuments.map((monument, index) => {
      const order = index + 1; // Order starts at 1
      const path = `monumenten/${monument}.png`;
      return new Question(categoryId, "", monument, path, order, true, false);
    });
    this.addAllQuestions(questions);
  }

  generate50PictureQuestionsForSportLegends() {
    const sportLegends = [
      "Michael Jordan", "Cristiano Ronaldo", "Lionel Messi", "Roger Federer", "Serena Williams", "Tiger Woods",
      "LeBron James", "Rafael Nadal", "David Beckham", "Michael Schumacher", "Usain Bolt", "Muhammad Ali",
      "Diego Maradona", "Pele", "Simone Biles", "Tom Brady", "Nadia Comaneci", "Emma Meesseman", "Julie Vanloo",
      "Andre Agassi", "Kobe Bryant", "Michael Phelps", "Shaquille O'Neal", "Billie Jean King", "Martina Navratilova",
      "Steffi Graf", "Larry Bird", "Jack Nicklaus", "Wayne Gretzky", "Carl Lewis", "Mia Hamm", "Arnold Schwarzenegger",
      "Sachin Tendulkar", "Allyson Felix", "Mark Spitz", "Babe Ruth", "Kareem Abdul-Jabbar", "Wilt Chamberlain",
      "Vladimir Klitschko", "Danica Patrick", "Cathy Freeman", "Jackie Robinson", "Lou Gehrig", "Yogi Berra",
      "Jerry Rice", "Carlton Fisk", "Bobby Orr", "Jimmy Connors", "Mick Doohan", "Sergey Bubka"

    ];

    const categoryId = "Gj2KBLjMD3uLAwBkbC2o";
    const questions: Question[] = sportLegends.map((legend, index) => {
      const order = index + 1; // Order starts at 1
      const path = `sportfiguren/${legend}.png`;
      return new Question(categoryId, "", legend, path, order, true, false);
    });
    this.addAllQuestions(questions);
  }

  generate50PictureQuestionsForVlaggen() {
    const vlaggen = [
      "België", "Nederland", "Frankrijk", "Duitsland", "Spanje", "Italië", "Verenigd Koninkrijk", "Luxemburg", "Zwitserland", "Oostenrijk",
      "Verenigde Staten", "Canada", "Portugal", "Griekenland", "Denemarken", "Zweden", "Noorwegen", "Finland", "Ierland", "Turkije",
      "Japan", "China", "Australië", "Rusland", "Brazilië", "India", "Zuid-Afrika", "Mexico", "Egypte", "Argentinië",
      "Thailand", "Polen", "Tsjechië", "Hongarije", "Roemenië", "Singapore", "Marokko", "Indonesië", "Maleisië", "Nieuw-Zeeland",
      "Kroatië", "Vaticaanstad", "IJsland", "Cuba", "Vietnam", "Sri Lanka", "Filipijnen", "Peru", "Chili", "Colombia"
    ];

    const afk = [
      "be", "nl", "fr", "de", "es", "it", "uk", "lu", "ch", "at",
      "us", "ca", "pt", "gr", "dk", "se", "no", "fi", "ie", "tr",
      "jp", "cn", "au", "ru", "br", "in", "za", "mx", "eg", "ar",
      "th", "pl", "cz", "hu", "ro", "sg", "ma", "id", "my", "nz",
      "hr", "va", "is", "cu", "vn", "lk", "ph", "pe", "cl", "co"

    ]

    const categoryId = "1ghVcJETp1OSac8DPA7J";
    const questions: Question[] = vlaggen.map((sign, index) => {
      const order = index + 1; // Order starts at 1
      const path = `vlaggen/${afk[index]}.png`;
      return new Question(categoryId, "", sign, path, order, true, false);
    });
    this.addAllQuestions(questions)
  }

  generate50PictureQuestionsForArtists() {
    const artists = [
      "Michael Jackson", "Queen", "The Beatles", "Coldplay", "Ed Sheeran", "Beyoncé", "Rihanna",
      "Adele", "Taylor Swift", "Eminem", "Bruno Mars", "The Rolling Stones", "Kanye West", "Justin Bieber",
      "Lady Gaga", "The Weeknd", "Ariana Grande", "Linkin Park", "Foo Fighters", "Green Day", "Imagine Dragons",
      "Shawn Mendes", "Dua Lipa", "Billie Eilish", "U2", "Metallica", "Red Hot Chili Peppers", "Nirvana",
      "Oasis", "Blink-182", "The Killers", "Maroon 5", "Kings of Leon", "OneRepublic", "Avicii", "Sam Smith",
      "Post Malone", "Harry Styles", "David Guetta", "Calvin Harris", "Ellie Goulding", "Sia", "The Script",
      "Florence + The Machine", "Mumford & Sons", "Arctic Monkeys", "Selena Gomez", "The Chainsmokers",
      "Major Lazer", "Kygo", "Drake"
    ];

    const categoryId = "KE6s30W1Oqt9mJrAZdV2";
    const questions: Question[] = artists.map((artist, index) => {
      const order = index + 1; // Order starts at 1
      const path = `artiesten/${artist}.png`;
      return new Question(categoryId, "", artist, path, order, true, false);
    });
    this.addAllQuestions(questions);
  }

  generate50PictureQuestionsForSports() {
    const sportsQuestions = [
      { question: "Hoeveel spelers staan er op een voetbalveld per team?", answer: "11" },
      { question: "Hoeveel ringen staan er in het Olympische logo?", answer: "5" },
      { question: "Welke kleur heeft de finishvlag in de Formule 1?", answer: "Zwart-wit geblokt" },
      { question: "Welke sport speelt Lionel Messi?", answer: "Voetbal" },
      { question: "Wat is de bijnaam van Michael Jordan?", answer: "Air Jordan" },
      { question: "Hoeveel punten is een driepunter waard in basketbal?", answer: "3" },
      { question: "Welke sport wordt gespeeld op Wimbledon?", answer: "Tennis" },
      { question: "Wat is de maximale score in een enkel frame van bowling?", answer: "300" },
      { question: "Hoe heet de internationale voetbalorganisatie?", answer: "FIFA" },
      { question: "In welke sport scoor je een hole-in-one?", answer: "Golf" },
      { question: "Hoe heet de grootste wielerwedstrijd ter wereld?", answer: "Tour de France" },
      { question: "Welke sport speelt Novak Djokovic?", answer: "Tennis" },
      { question: "Hoeveel halve cirkels zijn er op een basketbalveld?", answer: "2" },
      { question: "Welke sport speelt LeBron James?", answer: "Basketbal" },
      { question: "Hoeveel minuten duurt een rugbywedstrijd?", answer: "80" },
      { question: "Welke sport speelt Serena Williams?", answer: "Tennis" },
      { question: "Hoe heet de beroemdste Belgische wielrenner ooit?", answer: "Eddy Merckx" },
      { question: "Welke sport speelt Tom Brady?", answer: "American Football" },
      { question: "In welke sport gebruik je een shuttle?", answer: "Badminton" },
      { question: "Hoe heet de Belgische nationale voetbalploeg?", answer: "De Rode Duivels" },
      { question: "Wat is de bijnaam van Usain Bolt?", answer: "Lightning Bolt" },
      { question: "Hoeveel keer heeft Rafael Nadal Roland Garros gewonnen?", answer: "14" },
      { question: "Hoeveel spelers zijn er in een volleybalteam op het veld?", answer: "6" },
      { question: "Welke sport speelt Kevin De Bruyne?", answer: "Voetbal" },
      { question: "Wat betekent het Engelse woord 'strike' in bowlen?", answer: "Alle kegels in één worp omvergooien" },
      { question: "In welke sport is Lewis Hamilton bekend?", answer: "Formule 1" },
      { question: "Hoeveel sets moet je winnen in een grandslamfinale bij tennis (mannen)?", answer: "3" },
      { question: "Hoeveel gaatjes heeft een standaard golfbaan?", answer: "18" },
      { question: "Hoeveel seconden krijg je in basketbal om de bal over de middenlijn te brengen?", answer: "8" },
      { question: "Welke sport wordt gespeeld in de NBA?", answer: "Basketbal" },
      { question: "In welke sport wordt een puck gebruikt?", answer: "IJshockey" },
      { question: "Hoeveel keer heeft Michael Schumacher het F1-kampioenschap gewonnen?", answer: "7" },
      { question: "Hoeveel spelers staan er op het veld bij hockey per team?", answer: "11" },
      { question: "Wat betekent een 'perfect game' in bowlen?", answer: "300 punten scoren" },
      { question: "Hoeveel keer heeft België een WK-voetbalfinale gespeeld?", answer: "Geen" },
      { question: "Hoe lang duurt een halve voetbalwedstrijd?", answer: "45 minuten" },
      { question: "Hoe heet de trofee voor de winnaar van de Tour de France?", answer: "De gele trui" },
      { question: "Wat is de snelste zwemslag?", answer: "Vrije slag" },
      { question: "Hoeveel jaar duurt het tussen de Olympische Spelen?", answer: "4" },
      { question: "Welke sport speelt Cristiano Ronaldo?", answer: "Voetbal" },
      { question: "Hoe heet de beroemde Amerikaanse ijshockeycompetitie?", answer: "NHL" },
      { question: "Welke sport gebruikt de term 'love' voor nul punten?", answer: "Tennis" },
      { question: "Hoeveel punten is een touchdown waard in American Football?", answer: "6" },
      { question: "Hoeveel spelers zijn er in een waterpoloteam?", answer: "7" },
      { question: "Hoe heet het toernooi dat Novak Djokovic vaak wint?", answer: "Australian Open" },
      { question: "Hoeveel medailles heeft Phelps gewonnen op de Olympische Spelen?", answer: "28" },
      { question: "Welke sport speelt Kylian Mbappé?", answer: "Voetbal" },
      { question: "Hoe heet de Belgische wielerklassieker met kasseien?", answer: "Ronde van Vlaanderen" }
    ];

    const categoryId = "4EHHmQ8zicTylfvcIDt3";
    const questions: Question[] = sportsQuestions.map((q, index) => {
      const order = index + 1; // Order starts at 1
      return new Question(categoryId, q.question, q.answer, "", order, false, false);
    });
    this.addAllQuestions(questions)
    return questions;
  }

  generate50PictureQuestionsVoorAnimatiefiguren() {
    const figuren = [
      "Mickey Mouse", "Donald Duck", "Bugs Bunny", "Tom (Tom en Jerry)",  "Nemo (Finding Nemo)",
      "SpongeBob", "Scooby-Doo", "Samson (Samson & Gert)", "Mega Mindy", "Jerry (Tom en Jerry)", "Daffy Duck",
      "Plop (Kabouter Plop)", "Grote Smurf (De Smurfen)", "Maya de Bij",  "Olaf (Frozen)",
      "Bumba", "Piet Piraat", "Dora", "Elsa (Frozen)", "Goofy", "Marge Simpson (The Simpsons)", 
      "Anna (Frozen)", "Simba (The Lion King)", "Dory (Finding Nemo)",  "Gargamel (De Smurfen)","Timon (The Lion King)", "Woody Woodpecker", "Garfield", 
       "Woody (Toy Story)", "Buzz Lightyear (Toy Story)", "Shrek", "Fiona (Shrek)", "Peppa Pig", "Pumbaa (The Lion King)", "Pikachu","Ash Ketchum (Pokémon)",
      "Gru (Despicable Me)", "Marlin (Finding Nemo)", "Belle (Belle en het Beest)", 
      "Rapunzel (Tangled)", "Ariel (De Kleine Zeemeermin)", "WALL-E", "Bluey", "Taz", 
      "Shaun het Schaap", "Winnie de Pooh","Tweety", "Elmer Fudd"
    ];
  
    const categorieId = "3PQy1Eew1wa864OPtPwQ";
    const vragen: Question[] = figuren.map((figuur, index) => {
      const volgorde = index + 1; // Start bij 1
      const pad = `animatiefiguren/${figuur}.png`;
      return new Question(categorieId, "", figuur, pad, volgorde, true, false);
    });
    this.addAllQuestions(vragen);
  }
  
  generate50PictureQuestionsVoorVoetbalspelers() {
    const voetballers = [
      "Lionel Messi", "Cristiano Ronaldo (CR7)", "Diego Maradona", "Pelé", 
      "Kevin De Bruyne", "Romelu Lukaku", "Eden Hazard", "Thibaut Courtois", 
      "Zlatan Ibrahimović", "Kylian Mbappé", "Erling Haaland", "Robert Lewandowski", 
      "Virgil van Dijk", "Mohamed Salah", "Neymar Jr.", "Paolo Maldini", "Johan Cruijff", 
      "Zinédine Zidane", "Thierry Henry", "Franky Van der Elst", "Jan Ceulemans", 
      "Enzo Scifo", "Michel Preud'homme", "Jean-Marie Pfaff", "Wesley Sonck", 
      "Toby Alderweireld", "Dries Mertens", "Vincent Kompany", "Axel Witsel", 
      "Youri Tielemans", "Marc Wilmots", "Daniel Van Buyten", "Jan Vertonghen", 
      "Radja Nainggolan", "Luis Suárez", "Didier Drogba", "Ryan Giggs", 
      "Peter Crouch", "Roy Keane", "Patrice Evra", "Ronaldinho", "David Beckham", 
      "George Best", "Alan Shearer", "Rudi Völler", "Karl-Heinz Rummenigge", 
      "Andrea Pirlo", "Francesco Totti", "Mario Balotelli", "Clarence Seedorf"
    ];
  
    const categorieId = "D3MTECBzlRE2UCvTBMw3";
    const vragen: Question[] = voetballers.map((speler, index) => {
      const volgorde = index + 1; // Start bij 1
      const pad = `voetbal/${speler}.png`;
      return new Question(categorieId, "", speler, pad, volgorde, true, false);
    });
    this.addAllQuestions(vragen);
  }
  

  // NOT DONE
  generate50PictureQuestionsForLogos() {
    const logos = [
      "Nike", "Adidas", "Apple", "McDonald's", "CocaCola", "Pepsi", "Samsung", "Microsoft", "Google", "Facebook",
      "Twitter", "Amazon", "Starbucks", "Lipton", "Panasonic", "Harley Davidson", "Yamaha", "HP", "Sharp", "Lego",
      "Intel", "Sony", "Nike", "Lego", "Puma", "Red Bull", "Prada", "Louis Vuitton", "Rolex", "Chanel",
      "Gucci", "Versace", "Caterpillar", "Shell", "BP", "ExxonMobil", "Ebay", "General Electric", "Unilever",
      "KFC", "Ikea", "Firefox", "Tesco", "Nestle", "", "Pizza Hut", "Spotify", "Zara", "H&M",
      "Ben & Jerry's", "Walmart", "Marco Polo", "L'Oréal", "Hershey's"
    ];

    const categoryId = "7orbHcW4nSXqN0e1fFsy";
    const questions: Question[] = logos.map((logo, index) => {
      const order = index + 1; // Order starts at 1
      const path = `logos/${logo}.png`;
      return new Question(categoryId, "", logo, path, order, true, false);
    });

  }

  generate50PictureQuestionsForAnagrams() {
    const anagrams = [
        { question: "ROTS", answer: "SORT" },
        { question: "BRAND", answer: "BARND" },
        { question: "HOUT", answer: "THOU" },
        { question: "TUIN", answer: "UNIT" },
        { question: "KAMER", answer: "MAKER" },
        { question: "DOORN", answer: "RONDO" },
        { question: "GLANS", answer: "SLANG" },
        { question: "KRING", answer: "GRINK" },
        { question: "RAKEN", answer: "NEARK" },
        { question: "BOODS", answer: "DOSBO" },
        { question: "LAMPEN", answer: "PLANEM" },
        { question: "STADEN", answer: "DANSET" },
        { question: "METER", answer: "TERME" },
        { question: "BRIEVEN", answer: "REBIVEN" },
        { question: "PAARDEN", answer: "PANDERA" },
        { question: "VERF", answer: "FERV" },
        { question: "BLOEM", answer: "MOBLE" },
        { question: "DRAAI", answer: "RADIA" },
        { question: "GRAS", answer: "RAGS" },
        { question: "VROUW", answer: "WROUV" },
        { question: "DOOS", answer: "OSDO" },
        { question: "KRANK", answer: "KNARK" },
        { question: "LADEN", answer: "NADLE" },
        { question: "VECHTEN", answer: "CHETVNE" },
        { question: "BERICHT", answer: "ITCHBER" },
        { question: "DOCHTER", answer: "TERCHOD" },
        { question: "GEREED", answer: "DEGREE" },
        { question: "VORMEN", answer: "RENOVM" },
        { question: "PAREL", answer: "LAPER" },
        { question: "SCHILD", answer: "CHILDS" },
        { question: "GERAAD", answer: "RAAGED" },
        { question: "VERLANG", answer: "GANLVER" },
        { question: "ROOFDIER", answer: "REDIROOF" },
        { question: "PLANNING", answer: "PINANGLN" },
        { question: "REUZEN", answer: "ZURNER" },
        { question: "KARAVAAN", answer: "ANARKAVA" },
        { question: "BEDRIJF", answer: "BRIEFJD" },
        { question: "STORMIG", answer: "GROMSIT" },
        { question: "HANDDOEK", answer: "ODHNAEKD" },
        { question: "ONTWERP", answer: "POTREWN" },
        { question: "HORIZON", answer: "RINOOHZ" },
        { question: "SCHADUW", answer: "WADHUSC" },
        { question: "DUURZAAM", answer: "MAAZRUDU" },
        { question: "INKTVLEK", answer: "VETLINKK" },
        { question: "STATION", answer: "OTNISAT" },
        { question: "OPLOSSEN", answer: "SOLNOPSE" },
        { question: "VERLANGEN", answer: "RENVANLEG" },
        { question: "NACHTMERRIE", answer: "MINCHATRRIE" },
        { question: "ONDERZOEK", answer: "ODREZNOEK" },
        { question: "UITDAGING", answer: "TINGUADIG" }
    ];

    const categoryId = "RiE9soitDp6MxWjvp8ny";
    const questions: Question[] = anagrams.map((a, index) => {
        const order = index + 1; // Order starts at 1
        const path = `anagrammen/${index + 1}.png`; // Dynamically generate path
        return new Question(categoryId, a.question.toUpperCase(), a.answer.toUpperCase(), path, order, false, false);
    });

    return questions;
}

  
}