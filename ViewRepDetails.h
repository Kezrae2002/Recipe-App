#ifndef VIEWREPDETAILS_H 
#define VIEWREPDETAILS_H

#include <string>
#include <sqlite3.h>

class ViewRepDetails
{
    public:
    ViewRepDetails(const std::string& dbPath);

    std::string getRecipeDetails(int RecipeID);

    private:
    std::string databasePath;

    std::string getColumnText(sqlite3_stmt* stmt, int col);
};




#endif