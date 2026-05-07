#include <iostream>
#include <vector>
using namespace std;

/*
 * Shaker Sort (Cocktail Sort)
 * 
 * Time Complexity:  O(n²) worst & average case, O(n) best case
 * Space Complexity: O(1) auxiliary space
 * Stability:        Stable
 * 
 * Description:
 * Shaker sort is a variation of bubble sort that alternates sorting direction.
 * After each pass, the largest unsorted element bubbles to the right (like bubble sort),
 * and then the smallest unsorted element sinks to the left. This bidirectional approach
 * enables "small" elements to move more efficiently toward the start, reducing the
 * number of passes needed compared to standard bubble sort.
 */

class ShakerSorter {
public:
    struct Event {
        int index, a, b;
        string type;
    };

    vector<Event> events;
    vector<int> arr;

    ShakerSorter(vector<int> input) : arr(input) {}

    void sort() {
        int n = arr.size();
        int left = 0, right = n - 1;
        bool swapped;

        while (left < right) {
            // Forward pass (left to right)
            swapped = false;
            for (int i = left; i < right; i++) {
                // Comparing step
                events.push_back({i, -1, -1, "COMPARING"});
                
                if (arr[i] > arr[i + 1]) {
                    swap(arr[i], arr[i + 1]);
                    events.push_back({i, i, i + 1, "SWAPPING"});
                    swapped = true;
                }
            }
            // Largest element is now at 'right'
            right--;

            // If no swap occurred, array is sorted
            if (!swapped) break;

            // Backward pass (right to left)
            swapped = false;
            for (int i = right; i > left; i--) {
                // Comparing step
                events.push_back({i - 1, -1, -1, "COMPARING"});
                
                if (arr[i - 1] > arr[i]) {
                    swap(arr[i - 1], arr[i]);
                    events.push_back({i - 1, i - 1, i, "SWAPPING"});
                    swapped = true;
                }
            }
            // Smallest element is now at 'left'
            left++;

            // If no swap occurred, array is sorted
            if (!swapped) break;
        }

        // Mark all as sorted at the end
        for (int i = 0; i < n; i++) {
            events.push_back({i, -1, -1, "SORTED"});
        }
    }

    void print() {
        cout << "Sorted array: ";
        for (int x : arr) cout << x << " ";
        cout << endl;
    }
};

// Example usage
int main() {
    vector<int> data = {64, 34, 25, 12, 22, 11, 90, 88, 45, 50};
    ShakerSorter sorter(data);
    
    cout << "Original array: ";
    for (int x : data) cout << x << " ";
    cout << "\n";
    
    sorter.sort();
    sorter.print();

    // Output event sequence for visualization
    cout << "\nEvent sequence for visualization:\n";
    for (const auto& e : sorter.events) {
        cout << e.type << " at index " << e.index;
        if (e.a >= 0) cout << " (swap " << e.a << " <-> " << e.b << ")";
        cout << endl;
    }

    return 0;
}
