#ifndef SEARCHRECIPE_H
#define SEARCHRECIPE_H

#include <string>
#include <vector>

/*
User enters the name of the recipe they are searching for and select thier desired recipe
*/

class SearchRecipe
{  
    public:
    SearchRecipe(const std::string& dbPath);
    std::vector<int> searchByName(const std::string& name);
    std::vector<int> searchByKeyword(const std::string& keyword);
    std::vector<int> searchByCategory(const std::string& categoryName);

    private:
    std::string databasePath;

    std::vector<int> executeSearchQuery(const std::string& query);
};


#endif