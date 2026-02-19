#include "SearchRecipe.h"
#include <iostream>
#include <sqlite3.h>


SearchRecipe::SearchRecipe(const std::string& dbPath) : databasePath(dbPath) {}

std::vector<int> SearchRecipe::searchByName(const std::string& name)
{
    std::string query = "SELECT RecipeID FROM Recipe WHERE Name = '" + name + "';";
    
    return executeSearchQuery(query);
}

std::vector<int> SearchRecipe::searchByKeyword(const std::string& keyword)
{
    std::string query = "SELECT RecipeID FROM Recipe WHERE Name LIKE '%" + keyword + "%';";

    return executeSearchQuery(query);
}

std::vector<int> SearchRecipe::searchByCategory(const std::string& categoryName)
{
    std::string query = "SELECT Recipe.RecipeID " "FROM Recipe " "JOIN Category ON Recipe.CategoryID = Category.CategoryID " "WHERE Category.CategoryName = '" + categoryName + "';";

    return executeSearchQuery(query);
}

std::vector<int> SearchRecipe::executeSearchQuery(const std::string& query)
{
    sqlite3* db; 
    sqlite3_stmt* stmt; 
    std::vector<int> results;

    if (sqlite3_open(databasePath.c_str(), &db) != SQLITE_OK) 
    { 
        std::cerr << "Error opening database.\n"; 
        
        return results;
    }

    if (sqlite3_prepare_v2(db, query.c_str(), -1, &stmt, nullptr) != SQLITE_OK)
    {
        std::cerr << "SQL error: " << sqlite3_errmsg(db) << "\n";
        sqlite3_close(db);

        return results;
    }

    while (sqlite3_step(stmt) == SQLITE_ROW)
    {
        int recipeID = sqlite3_column_int(stmt, 0);
        results.push_back(recipeID);
    }

    sqlite3_finalize(stmt);
    sqlite3_close(db);

    return results;
}