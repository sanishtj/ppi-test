function searchByPerson(locations, query) {
  let contacts = [];
  let allContacts = [];
  locations.forEach((l) => {
    allContacts = [...allContacts, ...l.contacts_by_category];

    allContacts.forEach((a) => (contacts = [...contacts, ...a.contacts]));
  });

  let searchResults = contacts.filter(function (c) {
    return new RegExp(`${query.toLowerCase()}`).test(c.name.toLowerCase());
  });

  // Remove the duplicates with name and email id
  const filteredArr = searchResults.reduce((acc, current) => {
    const x = acc.find((item) => item.name === current.name && item.email === current.email);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);


  return filteredArr;
}



module.exports = searchByPerson;
