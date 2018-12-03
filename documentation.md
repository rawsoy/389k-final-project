
# Phone Database

---

Name: Jonathan Rawson

Date: Nov 24, 2018

Project Topic: Phones

URL: https://rawson389k.herokuapp.com/ 

---


### 1. Data Format and Storage

Data point fields - Phone:
- `Field 1`:     Name         `Type: String`
- `Field 2`:     Year         `Type: Number`
- `Field 3`:     Company      `Type: String`
- `Field 4`:     Image        `Type: String`
- `Field 5`:     Screen Size  `Type: Number`
- `Field 6`:     Reviews      `Type: [reviewSchema]`

Data point fields - Reviews:
- `Field 1`:     Rating       `Type: Number`
- `Field 2`:     Comment      `Type: String`
- `Field 3`:     Author       `Type: String`    

Schema: 
```javascript

{
   name: {
      type: String,
        required: true
    },
    year: {
       type: Number,
        min: 0,
        max: 2018,
        required: true
    },
    company: {
       type: String,
        required: true
    },
    image: {
       type: String
    },
    screenSize: {
        type: Number,
        required: true
    },
    reviews: [reviewSchema]
}

{
      rating: {
         type: Number,
         min: 0.0,
         max: 5.0,
         required: true,
      },
      comment: {
         type: String,
      },
      author: {
         type: String,
         required: true
      }
}
```

### 2. Add New Data

HTML form route: `/addPhone`

POST endpoint route: `/api/addPhone`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://rawson389k.herokuapp.com//api/addPhone',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name: 'Galaxy S8',
       company: 'Samsung',
       year: 2017
       image: "https://www.sprint.com/content/dam/sprint/commerce/devices/samsung/samsung_galaxy_s8/black/devicenb_650x900.png/jcr:content/renditions/cq5dam.thumbnail.290.370.png",
       screenSize: 5.7
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getPhones`

### 4. Search Data

Search Field: `name` or `year` or `company`

### 5. Navigation Pages

Navigation Filters
1. Companies -> `/companies` -> All companies in the database
2. This Year's Phones -> `/phones/thisyear` -> Phones from the current year
3. Popular -> `/phones/popular` -> Phones with an average review of 4 or greater
4. Pick My Next Phone -> `/phones/pick` -> Picks a random phone
5. Phablets -> `/phones/phablets` -> Phones with screen size >= 6

