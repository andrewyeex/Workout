const defaultData = {
    "app": {
      "workouts": [
        {
          "id": "gk39a8sf345",
          "name": "Absolute Power",
          "description": "Crazy muscle building exercises",
          "activities": [
            {
              "order": 1,
              "duration": 30,
              "id": "12sdgfna83"
            },
            {
              "order": 2,
              "duration": 30,
              "id": "12sdgfna83"
            }
          ]
        },
        {
          "id": "d8f23nf78a",
          "name": "Absolute Cardio",
          "description": "Crazy running sweat",
          "activities": [
            {
              "order": 1,
              "duration": 30,
              "id": "m39s8dg134"
            },
            {
              "order": 2,
              "duration": 30,
              "id": "m39s8dg134"
            }
          ]
        }
      ],
      "activities": [
        {
          "id": "12sdgfna83",
          "name": "break",
          "description": "relax and recover",
          "youtube": "https://www.youtube.com/watch?v=n9e7esJj6Hw"
        },
        {
          "id": "d8f23nf78a",
          "name": "Push Up",
          "description": "Basic Push Up exercises",
          "youtube": "https://www.youtube.com/watch?v=IODxDxX7oi4"
        }
      ],
      "completed": [
        {
          "workout_id": "gk39a8sf345",
          "datetime": 123456778,
          "completed": false,
          "last_order": 1
        }
      ],
      "username": "yeexay",
      "email": "andrew.yee@mail.com"
    }
  }

export { defaultData }
