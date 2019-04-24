const defaultData = {
    "app": {
      "workouts": [
        {
          "id": "gk39a8sf345",
          "name": "Absolute Power",
          "description": "Crazy muscle building",
          "image": "lift1",
          "activities": [
            {
              "order": 1,
              "duration": 3,
              "id": "12sdgfna83"
            },
            {
              "order": 2,
              "duration": 5,
              "id": "12sdgfna83"
            }
          ]
        },
        {
          "id": "m39s8dg134",
          "name": "Absolute Cardio",
          "description": "Crazy running sweat",
          "image": "run6",
          "activities": [
            {
              "order": 1,
              "duration": 30,
              "id": "d8f23nf78a"
            },
            {
              "order": 2,
              "duration": 30,
              "id": "d8f23nf78a"
            }
          ]
        }
      ],
      "activities": {
        "12sdgfna83" : {
          "name": "break",
          "description": "relax and recover",
          "youtube": "https://www.youtube.com/watch?v=n9e7esJj6Hw"
        },
        "d8f23nf78a" : {
          "name": "Push Up",
          "description": "Basic Push Up exercises",
          "youtube": "https://www.youtube.com/watch?v=IODxDxX7oi4"
        }
      },
      "completed": {
        "11/12/2019" : [{
          "workout_id": "gk39a8sf345",
          "datetime": 123456778,
          "completed": false,
          "last_order": 1
        }]
      },
      "username": "yeexay",
      "email": "andrew.yee@mail.com"
    }
  }

export { defaultData }
