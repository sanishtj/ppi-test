function searchByOffice(locations, query){
    let searchResults = locations.filter(function (l) { return new RegExp(`${query.toLowerCase()}`).test(l.office.toLowerCase()); });
    return searchResults;
}

module.exports = searchByOffice;