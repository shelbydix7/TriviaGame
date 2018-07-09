(function() {
    const start = $('button');
    const content = $('.content');
    let time;
    let timeClock;
    let questionNum = 0;
    const timerDisplay = $('h2#timer');
    const questionText = $('h2#question');
    let questions = Array(10);
    let answers = Array(10);
    let incorrectAnswers = Array(10);
    let options = [];
    let query = '';
    let optionText = $('li.option');
    let optionList = $('ul.options');
    let message = $('div.message');
    let correctText = $('h2.correct');
    let correctSpan = $('span.correct');
    let status = $('h2#status');
    
    
    
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    let correctResult = $('span#correct');
    let incorrectResult = $('span#incorrect');
    let unansweredResult = $('span#unanswered');
    let startOver = $('h2#startover');
    let result = $('div.result');
  
    const data = [
      {
        question:
          'Which of the following acts did NOT include Eric Clapton?"?',
        correct_answer: 'British Invasion',
        incorrect_answers: ['The Plastic Ono Band', 'Derek & the Dominoes', 'The Yardbirds']
      },
      {
        question:
          'Who recorded "Tres Hombres"??',
        correct_answer: 'ZZ Top',
        incorrect_answers: [
          'Led Zepplin',
          'Pink Floyd',
          'Fleetwood Mac'
        ]
      },
      {
        question:
          'Who of the following was formerly a member of the British group The Hollies?',
        correct_answer: 'Graham Nash',
        incorrect_answers: [
          'David Crosby',
          'Neil Young',
          'Stephen Stills'
        ]
      },
      {
        question: 'President Bill Clinton used which Fleetwood Mac song in his 1992 campaign?',
        correct_answer: 'Dont Stop',
        incorrect_answers: [
          'Dreams',
          'Tusk',
          'The Chain'
        ]
      },
      {
        question: 'Which of the following "Beatles" albums was made into a movie?',
        correct_answer: 'Let it Be',
        incorrect_answers: ['Abbey Road', 'Beatles for Sale', 'Rubber Soul']
      },
      {
        question:
          'Who financed Van Halens first demo??',
        correct_answer: 'Gene Simmons',
        incorrect_answers: ['Stephen Tyler', 'Robert Plant', 'Freddie Mercury']
      },
      {
        question:
       'Which famous Queen song is notably remembered from the movie "Waynes World"??',
        correct_answer: 'Bohemian Rhapsody',
        incorrect_answers: ['Killer Queen', 'Another One Bites the Dust', 'Under Pressure']
      },
      {
        question:
          'Which is a song by The Who?',
        correct_answer: 'Pinball Wizard',
        incorrect_answers: ['Jack and Diane', 'Brain Damage', 'Going to California']
      },
      {
        question:
          'On which Led Zeppelin album will you find the song "Houses Of The Holy"?',
        correct_answer: 'Physcial Graffiti',
        incorrect_answers: ['Led Zepplin', 'Led Zepplin IV', 'Houses of the Holy']
      },
      {
        question:
          'Which band sings the song "The End"?',
        correct_answer: 'The Doors',
        incorrect_answers: ['Journey', 'Styx', 'ELO']
      }
    ];
  
    const game = {
      getGif: () => {
        const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=5n53cDRx0FU49ewKdFwuBjKCTqy8XNip&limit=5`;
        $.get(url)
          .done(data => {
            gifSrc = data.data[0].images.original.url;
            
          })
          .fail(error => {
            console.log(error);
          });
      },
  
      reset: () => {
        questionText.removeClass('hidden');
        questionText.text(questions[questionNum]);
        $.each(optionText, (index, option) => {
          $(option).text(options[questionNum][index]);
        });
        correctSpan.text(answers[questionNum]);
        query = answers[questionNum]
          .toLowerCase()
          .trim()
          .replace(' ', '+');
        game.getGif();
        game.startTimer();
        start.addClass('hidden');
        content.removeClass('hidden');
        optionList.removeClass('hidden');
        message.addClass('hidden');
        gif.addClass('hidden');
        timerDisplay.removeClass('hidden');
        result.addClass('hidden');
      },
  
      result: () => {
        setTimeout(() => {
          gif.addClass('hidden');
          questionText.addClass('hidden');
          correctText.addClass('hidden');
          timerDisplay.addClass('hidden');
          status.text("All done, here's how you did!");
          result.removeClass('hidden');
          correctResult.text(correct);
          incorrectResult.text(incorrect);
          unansweredResult.text(unanswered);
        }, 4000);
      },
      startTimer: () => {
        timerDisplay.html(`Time Remaining: 15 Seconds`);
        time = 15;
        timeClock = setInterval(() => {
          time--;
          timerDisplay.html(
            `Time Remaining: <span id="time">${time}</span> Seconds`
          );
          if (time < 6) {
            $('span#time').addClass('warning');
          }
          if (time === 0) {
            unanswered++;
            clearInterval(timeClock);
            timerDisplay.text("Time's Up!");
            questionNum++;
            optionList.addClass('hidden');
            message.removeClass('hidden');
            correctText.removeClass('hidden');
            status.text('');
            gif.removeClass('hidden');
            if (questionNum < 10) {
              setTimeout(game.reset, 4000);
            } else {
              game.result();
            }
          }
        }, 1000);
      },
      getData: function() {
        questions = questions.fill().map((item, index) => {
          return (item = data[index].question);
        });
  
        answers = answers.fill().map((item, index) => {
          return (item = data[index].correct_answer);
        });
  
        console.log('answers: ', answers);
  
        incorrectAnswers = incorrectAnswers.fill().map((item, index) => {
          return (item = data[index].incorrect_answers);
        });
  
        options = incorrectAnswers.map((item, index) => {
          //random number between 0 and 3
          let randomIndex = Math.floor(Math.random() * 4);
          //insert correct answer at a random position inside incorrectAnswers array
          item.splice(randomIndex, 0, answers[index]);
          return item;
        });
  
        optionList.on('click', '.option', function() {
          clearInterval(timeClock);
          status.removeClass('hidden');
          optionList.addClass('hidden');
          message.removeClass('hidden');
          gif.removeClass('hidden');
          if ($(this).text() === answers[questionNum]) {
            correct++;
            correctText.addClass('hidden');
            status.text('Correct!');
          } else {
            incorrect++;
            correctText.removeClass('hidden');
            status.text('Wrong!');
          }
          questionNum++;
          if (questionNum < 10) {
            setTimeout(game.reset, 4000);
          } else {
            game.result();
          }
        });
        startOver.on('click', function() {
          correct = 0;
          incorrect = 0;
          unanswered = 0;
          questionNum = 0;
          game.reset();
        });
      }
    };
  
    game.getData();
  
    start.on('click', function() {
      game.reset();
    });
  })();