// Inverted index: term -> list of document ids
#include <iostream>
#include <map>
#include <set>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

int main() {
    vector<string> docs = {"the cat sat", "the dog ran", "cat and dog"};
    map<string, set<int>> index;
    for (size_t d = 0; d < docs.size(); ++d) {
        istringstream iss(docs[d]); string w;
        while (iss >> w) index[w].insert((int)d);
    }
    for (auto& [term, postings] : index) {
        cout << term << " ->";
        for (int id : postings) cout << " " << id;
        cout << "\n";
    }
    return 0;
}
