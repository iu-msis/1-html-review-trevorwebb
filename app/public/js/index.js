const Profile = {

    data() {
        return {
            "person": {},
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },  
    created() {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.person = parsedJson.results[0]
                console.log("C");
        })
        .catch( err => {
            console.error(err)
        })

        console.log("B");
    },
    
  }
  
Vue.createApp(Profile).mount('#ProfileApp');

