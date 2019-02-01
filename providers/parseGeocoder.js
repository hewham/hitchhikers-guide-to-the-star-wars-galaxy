export default function parseGeocoder(data){
  //get detailed loc data from lat lng
  return new Promise((resolve) => {
       var location = {};
         if (data[0] != null) {
           var components = data[0].address_components;
           console.log("address is: " + data[0].formatted_address);
           location.address = data[0].formatted_address;
           for(var component of components){
             if(component.types[0] == 'route'){
               location.street = component.long_name;
             }
             if(component.types[0] == 'street_number'){
               location.streetNumber = component.long_name;
             }
             if(component.types[0] == 'locality'){
               location.city = component.long_name;
             }
             if(component.types[0] == 'sublocality'){
               location.subcity = component.long_name;
             }
             if(component.types[0] == 'neighborhood'){
               location.neighborhood = component.long_name;
             }
             if(component.types[0] == 'administrative_area_level_1'){
               location.state = component.short_name;
             }
             if(component.types[0] == 'administrative_area_level_2'){
               location.county = component.short_name;
             }
             if(component.types[0] == 'country'){
               location.country = component.long_name;
               location.countryShort = component.short_name;
             }
             if(component.types[0] == 'postal_code'){
               location.zipcode = component.long_name;
             }
           }
          //  location.latitude = lat;
          //  location.longitude = lng;

          // console.log("location: ",location);
          //  resolve(location);
           resolve(data[0].formatted_address);
         } else {
           console.log("No address available");
         }
      //  this.loc_info = [street, street_num, city, state, country, countryShort, zip_code];
    });
   }