#include "SearchRecipe.h"
#include <iostream>
#include <sqlite3.h>

// Stores the database path passed in from the header file.
SearchRecipe::SearchRecipe(const std::string& dbPath) : databasePath(dbPath) {}

std::vector<int> SearchRecipe::searchByName(const std::string& name)
{
    // SQL query to find recipes with the exact name.
    std::string query = "SELECT RecipeID FROM Recipe WHERE Name = '" + name + "';";
    
    // Run the query and return the results.
    return executeSearchQuery(query);
}

std::vector<int> SearchRecipe::searchByKeyword(const std::string& keyword)
{
    // SQL query to find recipes where the name contains the keyword.
    std::string query = "SELECT RecipeID FROM Recipe WHERE Name LIKE '%" + keyword + "%';";

    // Run the query and return the results.
    return executeSearchQuery(query);
}

std::vector<int> SearchRecipe::searchByCategory(const std::string& categoryName)
{
    // SQL query to find recipes that match the given category. // Uses a JOIN to connect Recipe and Category tables.
    std::string query = "SELECT Recipe.RecipeID " "FROM Recipe " "JOIN Category ON Recipe.CategoryID = Category.CategoryID " "WHERE Category.CategoryName = '" + categoryName + "';";

    // Run the query and return the results.
    return executeSearchQuery(query);
}

std::vector<int> SearchRecipe::executeSearchQuery(const std::string& query)
{
    sqlite3* db; 
    sqlite3_stmt* stmt; 
    std::vector<int> results;

    // Try to open the database.
    if (sqlite3_open(databasePath.c_str(), &db) != SQLITE_OK) 
    { 
        std::cerr << "Error opening database.\n"; 
        
        return results; // Return empty list if database can't open.
    }

    // Prepare the SQL statement.
    if (sqlite3_prepare_v2(db, query.c_str(), -1, &stmt, nullptr) != SQLITE_OK)
    {
        std::cerr << "SQL error: " << sqlite3_errmsg(db) << "\n";
        sqlite3_close(db);

        return results; // Return empty list if query fails.
    }

    // Step through each row returned by the query
    while (sqlite3_step(stmt) == SQLITE_ROW)
    {
        // Get the RecipeID from the first column
        int recipeID = sqlite3_column_int(stmt, 0);
        // Add it to the results list.
        results.push_back(recipeID);
    }

    // Clean up the prepared statement.
    sqlite3_finalize(stmt);
    // Close the database connection.
    sqlite3_close(db);

    // Return all collected RecipeIDs.
    return results;
}