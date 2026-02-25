#ifndef SEARCHRECIPE_H
#define SEARCHRECIPE_H

#include <string>
#include <vector>

/*
    This class is used to search for recipes in the database.
    It can search by:
      - Recipe name
      - Keyword in the name
      - Category
*/

class SearchRecipe
{  
    public:
    // Saves the path to the database file.
    SearchRecipe(const std::string& dbPath);
    // Finds recipes that match the exact name. 
    // // Returns a list of recipe IDs.
    std::vector<int> searchByName(const std::string& name);
    // Finds recipes that contain the keyword in their name. 
    // // Returns a list of recipe IDs.
    std::vector<int> searchByKeyword(const std::string& keyword);
    // Finds recipes that belong to the given category. 
    // // Returns a list of recipe IDs.
    std::vector<int> searchByCategory(const std::string& categoryName);

    private:
    // Stores the database file location.
    std::string databasePath;
    // Runs the SQL search query and returns recipe IDs.
    std::vector<int> executeSearchQuery(const std::string& query);
};


#endif