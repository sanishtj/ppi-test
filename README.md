The PPI public website [contacts page]([https://www.ppi.ca/en/contact](https://www.ppi.ca/en/contact)) contains a list of all our offices with addresses, key contacts and geo location info.

It doesn’t yet have a much requested ‘search’ feature.

The contact info is stored in an Azure table on the production web site, and is provided in the json file included in this project.

For the purposes of this test please create a REST API that provides a simple search capability and returns either an office or a contact (person)

For example, if the request is [https://example.com/api?query=Sean%20Carey](https://example.com/api?query=Sean%20Carey) , the api should return the contact object for him:

     {
        “name”: “Sean Carey”,
        “title”: “Vice-President, Sales - British Columbia”,
        “phone”: “778-374-3501”,
        “email”: “ [scarey@ppi.ca](mailto:scarey@ppi.ca) “
     }

for an office query, [https://example.com/api?query=Vancouver](https://example.com/api?query=Vancouver) , return the entire json object for ‘Vancouver’

Build the **simplest** possible solution or MVP (minimal viable product). It doesn't need any error handling or other clever features and can simply load the provided json file on startup and assume it will never change.

Use any open source technology and libraries you deem appropriate e.g. Node/Express, .Net Core MVC, Python/Flask

Clone the provided repo, and send a link to a publicly available version of it when you have completed the project.