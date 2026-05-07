// Auto-generated code DB for visualization
const codeSearchLinear = `#include <iostream>
using namespace std;

int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }
    return -1; // Not found
}

int main() {
    int arr[] = {23, 12, 56, 8, 38, 2, 72, 91, 16, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 38;

    int result = linearSearch(arr, size, target);

    if (result != -1)
        cout << "Element " << target << " found at index " << result << endl;
    else
        cout << "Element " << target << " not found." << endl;

    return 0;
}
`;

const codeSearchBinary = `#include <iostream>
using namespace std;

int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target)
            return mid;

        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }

    return -1; // Not found
}

int main() {
    // Array must be sorted for Binary Search
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 56;

    int result = binarySearch(arr, 0, size - 1, target);

    if (result != -1)
        cout << "Element " << target << " found at index " << result << endl;
    else
        cout << "Element " << target << " not found." << endl;

    return 0;
}
`;

const codeSortBubble = `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    for (int i=0; i<n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`;

const codeSortSelect = `#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    selectionSort(arr, n);
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`;

const codeSortInsert = `#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    insertionSort(arr, n);
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`;

const codeSortQuick = `#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    quickSort(arr, 0, n - 1);
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`;

const codeSortMerge = `#include <iostream>
using namespace std;

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for(int i=0; i<n1; i++) L[i] = arr[l + i];
    for(int j=0; j<n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    mergeSort(arr, 0, n - 1);
    for(int i=0; i<n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`;

const codeSortShell = `#include <iostream>
using namespace std;

void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}

int main() {
    int arr[] = {12, 34, 54, 2, 3};
    int n = sizeof(arr) / sizeof(arr[0]);
    shellSort(arr, n);
    for (int i=0; i<n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`;

const codeSortBucket = `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void bucketSort(vector<float>& arr) {
    int n = arr.size();
    if (n <= 0) return;

    // 1. Create n empty buckets
    vector<vector<float>> buckets(n);

    // 2. Distribute elements into buckets based on their value
    for (int i = 0; i < n; i++) {
        // Elements are assumed to be normalized between 0.0 and 1.0!
        // For array [0.78, 0.17, 0.39, 0.26, 0.72]
        int bucketIndex = n * arr[i];
        if(bucketIndex >= n) bucketIndex = n - 1; // Catch edge cases
        buckets[bucketIndex].push_back(arr[i]);
    }

    // 3. Sort individual buckets (typically using Insertion Sort)
    for (int i = 0; i < n; i++) {
        sort(buckets[i].begin(), buckets[i].end());
    }

    // 4. Concatenate all buckets back into the original array
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index++] = buckets[i][j];
        }
    }
}

int main() {
    vector<float> arr = {0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434};
    bucketSort(arr);
    return 0;
}
`;

const codeSortCounting = `#include <iostream>
#include <vector>
using namespace std;

void countingSort(vector<int>& arr) {
    int max = *max_element(arr.begin(), arr.end());
    int min = *min_element(arr.begin(), arr.end());
    int range = max - min + 1;

    // 1. Create a dynamic counting array initialized to 0
    vector<int> count(range, 0);
    vector<int> output(arr.size());

    // 2. Count the frequency of each element
    for (int i = 0; i < arr.size(); i++) {
        count[arr[i] - min]++;
    }

    // 3. Modify count array to store actual positions (Cumulative Sum)
    for (int i = 1; i < count.size(); i++) {
        count[i] += count[i - 1];
    }

    // 4. Build output array dynamically by mapping elements back
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    for (int i = 0; i < arr.size(); i++) {
        arr[i] = output[i];
    }
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    countingSort(arr);
    return 0;
}
`;

const codeSortRadix = `#include <iostream>
#include <vector>
using namespace std;

void countingSortDigit(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    int count[10] = {0}; // Radix is base-10

    // Store count of occurrences for the defined digit (1s, 10s, 100s...)
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }

    // Change count[i] so that count[i] now contains actual position
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array from back to front to maintain stability!
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

void radixSort(vector<int>& arr) {
    int maxEl = *max_element(arr.begin(), arr.end());

    // Do counting sort for every digit. 
    // exp is 10^i where i is current digit number
    for (int exp = 1; maxEl / exp > 0; exp *= 10) {
        countingSortDigit(arr, exp);
    }
}

int main() {
    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(arr);
    return 0;
}
`;

const codeSortHeap = `#include <iostream>
#include <vector>

using namespace std;

// To heapify a subtree rooted with node i
void heapify(vector<int>& arr, int n, int i) {
    int largest = i; // Initialize largest as root
    int left = 2 * i + 1; // Left child relative offset
    int right = 2 * i + 2; // Right child relative offset

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();

    // 1. Build Heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 2. One by one extract an element from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root (Absolute maximum) to the array tail
        swap(arr[0], arr[i]);

        // Call max heapify on the reduced heap enforcing structure
        heapify(arr, i, 0);
    }
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    heapSort(arr);
    return 0;
}
`;

const codeSortShaker = `#include <iostream>
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
    cout << "\\n";
    
    sorter.sort();
    sorter.print();

    // Output event sequence for visualization
    cout << "\\nEvent sequence for visualization:\\n";
    for (const auto& e : sorter.events) {
        cout << e.type << " at index " << e.index;
        if (e.a >= 0) cout << " (swap " << e.a << " <-> " << e.b << ")";
        cout << endl;
    }

    return 0;
}
`;

const codeTreeBST = `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BST {
public:
    Node* root = nullptr;
    Node* insert(Node* node, int data) {
        if (!node) return new Node(data);
        if (data < node->data) node->left = insert(node->left, data);
        else if (data > node->data) node->right = insert(node->right, data);
        return node;
    }
    void insert(int data) { root = insert(root, data); }
    
    void inorder(Node* node) {
        if (!node) return;
        inorder(node->left);
        cout << node->data << " ";
        inorder(node->right);
    }
};

int main() {
    BST tree;
    tree.insert(50);
    tree.insert(30);
    tree.insert(70);
    tree.insert(20);
    tree.insert(40);
    tree.inorder(tree.root);
    cout << endl;
    return 0;
}
`;

const codeTreeAVL = `#include <iostream>
using namespace std;

struct Node {
    int key; 
    Node *left, *right; 
    int height;
    Node(int k) : key(k), left(nullptr), right(nullptr), height(1) {}
};

class AVLTree {
    int height(Node* N) { return N ? N->height : 0; }
    int max(int a, int b) { return (a > b) ? a : b; }
    int getBalance(Node* N) { return N ? height(N->left) - height(N->right) : 0; }
    
    Node* rightRotate(Node* y) {
        Node* x = y->left; Node* T2 = x->right;
        x->right = y; y->left = T2;
        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;
        return x;
    }
    
    Node* leftRotate(Node* x) {
        Node* y = x->right; Node* T2 = y->left;
        y->left = x; x->right = T2;
        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;
        return y;
    }
public:
    Node* root = nullptr;
    Node* insert(Node* node, int key) {
        if (!node) return new Node(key);
        if (key < node->key) node->left = insert(node->left, key);
        else if (key > node->key) node->right = insert(node->right, key);
        else return node;

        node->height = 1 + max(height(node->left), height(node->right));
        int balance = getBalance(node);

        if (balance > 1 && key < node->left->key) return rightRotate(node);
        if (balance < -1 && key > node->right->key) return leftRotate(node);
        if (balance > 1 && key > node->left->key) {
            node->left = leftRotate(node->left); return rightRotate(node);
        }
        if (balance < -1 && key < node->right->key) {
            node->right = rightRotate(node->right); return leftRotate(node);
        }
        return node;
    }
    void insert(int key) { root = insert(root, key); }
};

int main() {
    AVLTree tree;
    tree.insert(10);
    tree.insert(20);
    tree.insert(30); // Triggers Left Rotation
    return 0;
}
`;

const codeTreeRB = `#include <iostream>
using namespace std;

enum Color { RED, BLACK };

struct Node {
    int data; bool color; 
    Node *left, *right, *parent;
    Node(int d) : data(d), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

class RBTree {
public:
    Node* root = nullptr;

    void rotateLeft(Node*& root, Node*& pt) {
        Node* pt_right = pt->right;
        pt->right = pt_right->left;
        if (pt->right != nullptr) pt->right->parent = pt;
        pt_right->parent = pt->parent;
        if (pt->parent == nullptr) root = pt_right;
        else if (pt == pt->parent->left) pt->parent->left = pt_right;
        else pt->parent->right = pt_right;
        pt_right->left = pt; pt->parent = pt_right;
    }

    void rotateRight(Node*& root, Node*& pt) {
        Node* pt_left = pt->left;
        pt->left = pt_left->right;
        if (pt->left != nullptr) pt->left->parent = pt;
        pt_left->parent = pt->parent;
        if (pt->parent == nullptr) root = pt_left;
        else if (pt == pt->parent->left) pt->parent->left = pt_left;
        else pt->parent->right = pt_left;
        pt_left->right = pt; pt->parent = pt_left;
    }

    void fixViolation(Node*& root, Node*& pt) {
        Node* parent_pt = nullptr; Node* grand_parent_pt = nullptr;
        while ((pt != root) && (pt->color != BLACK) && (pt->parent->color == RED)) {
            parent_pt = pt->parent; grand_parent_pt = pt->parent->parent;
            if (parent_pt == grand_parent_pt->left) {
                Node* uncle_pt = grand_parent_pt->right;
                if (uncle_pt != nullptr && uncle_pt->color == RED) {
                    grand_parent_pt->color = RED; parent_pt->color = BLACK;
                    uncle_pt->color = BLACK; pt = grand_parent_pt;
                } else {
                    if (pt == parent_pt->right) { rotateLeft(root, parent_pt); pt = parent_pt; parent_pt = pt->parent; }
                    rotateRight(root, grand_parent_pt); swap(parent_pt->color, grand_parent_pt->color); pt = parent_pt;
                }
            } else {
                Node* uncle_pt = grand_parent_pt->left;
                if ((uncle_pt != nullptr) && (uncle_pt->color == RED)) {
                    grand_parent_pt->color = RED; parent_pt->color = BLACK;
                    uncle_pt->color = BLACK; pt = grand_parent_pt;
                } else {
                    if (pt == parent_pt->left) { rotateRight(root, parent_pt); pt = parent_pt; parent_pt = pt->parent; }
                    rotateLeft(root, grand_parent_pt); swap(parent_pt->color, grand_parent_pt->color); pt = parent_pt;
                }
            }
        }
        root->color = BLACK;
    }

    void insert(int data) {
        Node* pt = new Node(data);
        if(root == nullptr) { root = pt; root->color = BLACK; return; }
        // ... Standard BST insertion, then fixViolation(root, pt);
    }
};

int main() {
    RBTree tree;
    tree.insert(7);
    return 0;
}
`;

const codeTreeSplay = `#include <iostream>
using namespace std;

struct Node {
    int key; 
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

class SplayTree {
    Node* rightRotate(Node* x) {
        Node* y = x->left; 
        x->left = y->right; 
        y->right = x; 
        return y;
    }
    
    Node* leftRotate(Node* x) {
        Node* y = x->right; 
        x->right = y->left; 
        y->left = x; 
        return y;
    }
public:
    Node* root = nullptr;
    
    Node* splay(Node* root, int key) {
        if (!root || root->key == key) return root;

        if (root->key > key) {
            if (!root->left) return root;
            if (root->left->key > key) {
                root->left->left = splay(root->left->left, key);
                root = rightRotate(root);
            } else if (root->left->key < key) {
                root->left->right = splay(root->left->right, key);
                if (root->left->right) root->left = leftRotate(root->left);
            }
            return (root->left == nullptr) ? root : rightRotate(root);
        } else {
            if (!root->right) return root;
            if (root->right->key > key) {
                root->right->left = splay(root->right->left, key);
                if (root->right->left) root->right = rightRotate(root->right);
            } else if (root->right->key < key) {
                root->right->right = splay(root->right->right, key);
                root = leftRotate(root);
            }
            return (root->right == nullptr) ? root : leftRotate(root);
        }
    }
    
    void insert(int k) {
        if (!root) { root = new Node(k); return; }
        root = splay(root, k);
        if (root->key == k) return;
        Node* n = new Node(k);
        if (root->key > k) {
            n->right = root; n->left = root->left; root->left = nullptr;
        } else {
            n->left = root; n->right = root->right; root->right = nullptr;
        }
        root = n;
    }
    
    void search(int k) {
        root = splay(root, k);
    }
};

int main() {
    SplayTree tree;
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.search(10); // Splays 10 to the top
    return 0;
}
`;

const codeArray = `#include <iostream>
using namespace std;

#define MAX_SIZE 5

class StackArray {
private:
    int arr[MAX_SIZE];
    int topIndex;

public:
    StackArray() {
        topIndex = -1;
    }

    bool push(int val) {
        if (topIndex >= MAX_SIZE - 1) {
            cout << "Stack Overflow!" << endl;
            return false;
        }
        arr[++topIndex] = val;
        cout << "Pushed " << val << endl;
        return true;
    }

    int pop() {
        if (topIndex < 0) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        int val = arr[topIndex--];
        cout << "Popped " << val << endl;
        return val;
    }

    bool isEmpty() {
        return topIndex < 0;
    }
};

int main() {
    StackArray s;
    s.push(10);
    s.push(20);
    s.pop();
    return 0;
}
`;

const codeLinkedList = `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class StackLinkedList {
private:
    Node* topNode;

public:
    StackLinkedList() {
        topNode = nullptr;
    }

    void push(int val) {
        Node* newNode = new Node(val);
        newNode->next = topNode;
        topNode = newNode;
        cout << "Pushed " << val << endl;
    }

    int pop() {
        if (!topNode) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        int val = topNode->data;
        Node* temp = topNode;
        topNode = topNode->next;
        delete temp;
        cout << "Popped " << val << endl;
        return val;
    }

    bool isEmpty() {
        return topNode == nullptr;
    }
};

int main() {
    StackLinkedList s;
    s.push(10);
    s.push(20);
    s.pop();
    return 0;
}
`;

const codeQueue = `#include <iostream>
using namespace std;

#define MAX_SIZE 5

class CircularQueue {
private:
    int arr[MAX_SIZE];
    int front, rear, count;

public:
    CircularQueue() {
        front = 0;
        rear = -1;
        count = 0;
    }

    bool enqueue(int val) {
        if (count >= MAX_SIZE) {
            cout << "Queue Overflow!" << endl;
            return false;
        }
        rear = (rear + 1) % MAX_SIZE;
        arr[rear] = val;
        count++;
        cout << "Enqueued " << val << endl;
        return true;
    }

    int dequeue() {
        if (count == 0) {
            cout << "Queue Underflow!" << endl;
            return -1;
        }
        int val = arr[front];
        front = (front + 1) % MAX_SIZE;
        count--;
        cout << "Dequeued " << val << endl;
        return val;
    }

    bool isEmpty() {
        return count == 0;
    }
};

int main() {
    CircularQueue q;
    q.enqueue(10);
    q.enqueue(20);
    q.dequeue();
    return 0;
}
`;

const codeGraph = `#include <iostream>
#include <vector>
using namespace std;

class Graph {
private:
    int V;
    vector<vector<int> > adjMatrix;

public:
    Graph(int vertices) {
        V = vertices;
        adjMatrix.resize(V, vector<int>(V, 0));
    }

    void addEdge(int u, int v) {
        if (u >= 0 && u < V && v >= 0 && v < V) {
            adjMatrix[u][v] = 1;
            adjMatrix[v][u] = 1; // Since undirected
            cout << "Edge added between " << u << " and " << v << endl;
        }
    }

    void printGraph() {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                cout << adjMatrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    Graph g(5); // 5 nodes (0 to 4)
    g.addEdge(0, 1);
    g.addEdge(0, 4);
    g.addEdge(1, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 3);
    g.addEdge(3, 4);
    return 0;
}
`;

const codeListArray = `#include <iostream>
using namespace std;

class ArrayList {
private:
    int* arr;
    int capacity;
    int size;

public:
    ArrayList(int cap = 10) {
        capacity = cap;
        size = 0;
        arr = new int[capacity];
    }
    ~ArrayList() { delete[] arr; }

    void insert(int index, int val) {
        if (index < 0 || index > size || size >= capacity) return;
        for (int i = size; i > index; i--) {
            arr[i] = arr[i - 1]; // Shift right
        }
        arr[index] = val;
        size++;
    }

    void remove(int index) {
        if (index < 0 || index >= size) return;
        for (int i = index; i < size - 1; i++) {
            arr[i] = arr[i + 1]; // Shift left
        }
        size--;
    }
};

int main() {
    ArrayList list(10);
    list.insert(0, 10);
    list.insert(1, 20);
    list.remove(0);
    return 0;
}
`;

const codeListLinked = `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;

public:
    LinkedList() : head(nullptr) {}

    void insert(int index, int val) {
        Node* newNode = new Node(val);
        if (index == 0) {
            newNode->next = head;
            head = newNode;
            return;
        }
        Node* temp = head;
        for (int i = 0; temp != nullptr && i < index - 1; i++) {
            temp = temp->next;
        }
        if (!temp) return; // Out of bounds
        newNode->next = temp->next;
        temp->next = newNode;
    }

    void remove(int index) {
        if (!head) return;
        if (index == 0) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }
        Node* temp = head;
        for (int i = 0; temp != nullptr && i < index - 1; i++) {
            temp = temp->next;
        }
        if (!temp || !temp->next) return;
        Node* delNode = temp->next;
        temp->next = delNode->next;
        delete delNode;
    }
};

int main() {
    LinkedList list;
    list.insert(0, 10);
    list.insert(1, 20);
    list.remove(0);
    return 0;
}
`;

const codeHashChain = `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class HashChaining {
private:
    int TABLE_SIZE;
    Node** table;

public:
    HashChaining(int size = 5) {
        TABLE_SIZE = size;
        table = new Node*[TABLE_SIZE];
        for (int i = 0; i < TABLE_SIZE; i++) table[i] = nullptr;
    }

    int hashFunction(int key) {
        return key % TABLE_SIZE;
    }

    void insert(int key) {
        int hashIdx = hashFunction(key);
        Node* newNode = new Node(key);
        // Insert at head for simplicity O(1)
        newNode->next = table[hashIdx];
        table[hashIdx] = newNode;
        cout << "Inserted " << key << " at index " << hashIdx << endl;
    }

    void display() {
        for (int i = 0; i < TABLE_SIZE; i++) {
            cout << "[" << i << "] --> ";
            Node* temp = table[i];
            while (temp) {
                cout << temp->data << " -> ";
                temp = temp->next;
            }
            cout << "NULL\\n";
        }
    }
};

int main() {
    HashChaining ht(5);
    ht.insert(33);
    ht.insert(21);
    ht.insert(43); // Collision with 33
    ht.display();
    return 0;
}
`;

const codeHashOpen = `#include <iostream>
using namespace std;

class HashOpenAddressing {
private:
    int TABLE_SIZE;
    int* table;
    int curr_size;

public:
    HashOpenAddressing(int size = 5) {
        TABLE_SIZE = size;
        table = new int[TABLE_SIZE];
        for (int i = 0; i < TABLE_SIZE; i++) table[i] = -1; // -1 indicates empty
        curr_size = 0;
    }

    int hashFunction(int key) {
        return key % TABLE_SIZE;
    }

    bool insert(int key) {
        if (curr_size >= TABLE_SIZE) {
            cout << "Hash Table Full!" << endl;
            return false;
        }
        
        int idx = hashFunction(key);
        
        // Linear Probing
        while (table[idx] != -1) {
            cout << "Collision at index " << idx << "! Probing next..." << endl;
            idx = (idx + 1) % TABLE_SIZE;
        }
        
        table[idx] = key;
        curr_size++;
        cout << "Inserted " << key << " securely at index " << idx << endl;
        return true;
    }

    void display() {
        for (int i = 0; i < TABLE_SIZE; i++) {
            if (table[i] != -1) cout << "[" << i << "] --> " << table[i] << endl;
            else cout << "[" << i << "] --> Empty" << endl;
        }
    }
};

int main() {
    HashOpenAddressing ht(5);
    ht.insert(42);
    ht.insert(12);
    ht.insert(32); // Collision with 42! Will slide to empty slot.
    ht.display();
    return 0;
}
`;

const codeHashBucket = `#include <iostream>
using namespace std;

struct Bucket {
    int slots[2];
    int count;
    Bucket() {
        slots[0] = -1; slots[1] = -1;
        count = 0;
    }
};

class HashBucketing {
private:
    int NUM_BUCKETS;
    Bucket* table;

public:
    HashBucketing(int buckets = 4) { // 4 buckets * 2 slots = 8 total capacity
        NUM_BUCKETS = buckets;
        table = new Bucket[NUM_BUCKETS];
    }

    int hashFunction(int key) {
        return key % NUM_BUCKETS;
    }

    bool insert(int key) {
        int idx = hashFunction(key);
        
        // Try filling primary physical bucket block
        if (table[idx].count < 2) {
            table[idx].slots[table[idx].count++] = key;
            cout << "Inserted " << key << " directly into Bucket Index " << idx << endl;
            return true;
        }
        cout << "Bucket " << idx << " is full. Probing to next bucket overflow..." << endl;
        
        // Primary bucket is full; Linear Probing to next adjacent block
        int startIdx = idx;
        idx = (idx + 1) % NUM_BUCKETS;
        while (idx != startIdx) {
            if (table[idx].count < 2) {
                table[idx].slots[table[idx].count++] = key;
                cout << "Overflow Inserted " << key << " into Bucket Index " << idx << endl;
                return true;
            }
            idx = (idx + 1) % NUM_BUCKETS;
        }
        
        cout << "Catastrophic Failure: All Hash Buckets completely saturated!" << endl;
        return false; 
    }
};

int main() {
    HashBucketing ht(4);
    ht.insert(10);
    ht.insert(14); // Collision? 14%4=2, 10%4=2. Fills Bucket 2 nicely.
    ht.insert(22); // 22%4=2! Bucket 2 is FULL! This will overflow to Bucket 3.
    return 0;
}
`;

const codeHeapBinary = `#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

class BinaryHeap {
private:
    vector<int> data;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    void siftUp(int i) {
        while (i > 0) {
            int p = (i - 1) / 2;
            if (!cmp(data[i], data[p])) break;
            swap(data[i], data[p]);
            i = p;
        }
    }

    void siftDown(int i) {
        int n = static_cast<int>(data.size());
        while (true) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            int best = i;

            if (left < n && cmp(data[left], data[best])) best = left;
            if (right < n && cmp(data[right], data[best])) best = right;
            if (best == i) break;

            swap(data[i], data[best]);
            i = best;
        }
    }

public:
    explicit BinaryHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) {
        data.push_back(x);
        siftUp(static_cast<int>(data.size()) - 1);
    }

    int peek() const {
        if (data.empty()) throw runtime_error("Heap is empty");
        return data[0];
    }

    int extractTop() {
        if (data.empty()) throw runtime_error("Heap is empty");
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        if (!data.empty()) siftDown(0);
        return top;
    }

    void decreaseOrIncreaseKey(int idx, int newVal) {
        if (idx < 0 || idx >= static_cast<int>(data.size())) {
            throw runtime_error("Index out of range");
        }
        int oldVal = data[idx];
        data[idx] = newVal;
        if (cmp(newVal, oldVal)) siftUp(idx);
        else siftDown(idx);
    }

    void eraseAt(int idx) {
        if (idx < 0 || idx >= static_cast<int>(data.size())) {
            throw runtime_error("Index out of range");
        }
        data[idx] = data.back();
        data.pop_back();
        if (idx < static_cast<int>(data.size())) {
            siftUp(idx);
            siftDown(idx);
        }
    }

    void mergeFrom(const vector<int>& other) {
        for (int v : other) insert(v);
    }

    void printArray() const {
        cout << (isMinHeap ? "MinHeap" : "MaxHeap") << " array: ";
        for (int v : data) cout << v << " ";
        cout << "\\n";
    }
};

int main() {
    BinaryHeap h(true);
    h.insert(20);
    h.insert(7);
    h.insert(3);
    h.insert(12);
    h.printArray();

    cout << "Peek: " << h.peek() << "\\n";
    cout << "Extract: " << h.extractTop() << "\\n";

    h.decreaseOrIncreaseKey(1, 1);
    h.printArray();

    h.eraseAt(0);
    h.printArray();

    h.mergeFrom({9, 4, 15});
    h.printArray();

    return 0;
}
`;

const codeHeapBinomial = `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct BNode {
    int key;
    int degree;
    BNode* parent;
    BNode* child;
    BNode* sibling;
    explicit BNode(int k) : key(k), degree(0), parent(nullptr), child(nullptr), sibling(nullptr) {}
};

class BinomialHeap {
private:
    BNode* head = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    BNode* mergeRootLists(BNode* h1, BNode* h2) {
        if (!h1) return h2;
        if (!h2) return h1;

        BNode* newHead = nullptr;
        BNode* tail = nullptr;

        while (h1 && h2) {
            BNode* pick;
            if (h1->degree <= h2->degree) {
                pick = h1;
                h1 = h1->sibling;
            } else {
                pick = h2;
                h2 = h2->sibling;
            }

            if (!newHead) {
                newHead = tail = pick;
            } else {
                tail->sibling = pick;
                tail = pick;
            }
        }
        tail->sibling = h1 ? h1 : h2;
        return newHead;
    }

    void linkTrees(BNode* rootY, BNode* rootZ) {
        rootY->parent = rootZ;
        rootY->sibling = rootZ->child;
        rootZ->child = rootY;
        rootZ->degree++;
    }

    BNode* unionHeaps(BNode* h1, BNode* h2) {
        BNode* newHead = mergeRootLists(h1, h2);
        if (!newHead) return nullptr;

        BNode* prev = nullptr;
        BNode* curr = newHead;
        BNode* next = curr->sibling;

        while (next) {
            bool degreeDiff = curr->degree != next->degree;
            bool tripleSame = next->sibling && next->sibling->degree == curr->degree;

            if (degreeDiff || tripleSame) {
                prev = curr;
                curr = next;
            } else if (cmp(curr->key, next->key)) {
                curr->sibling = next->sibling;
                linkTrees(next, curr);
            } else {
                if (!prev) newHead = next;
                else prev->sibling = next;
                linkTrees(curr, next);
                curr = next;
            }
            next = curr->sibling;
        }

        return newHead;
    }

public:
    explicit BinomialHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int key) {
        BNode* single = new BNode(key);
        head = unionHeaps(head, single);
    }

    int peek() const {
        if (!head) return isMinHeap ? INT_MAX : INT_MIN;
        BNode* best = head;
        for (BNode* p = head->sibling; p; p = p->sibling) {
            if (cmp(p->key, best->key)) best = p;
        }
        return best->key;
    }

    int extractTop() {
        if (!head) return isMinHeap ? INT_MAX : INT_MIN;

        BNode* prevBest = nullptr;
        BNode* best = head;
        BNode* prev = nullptr;

        for (BNode* p = head; p; p = p->sibling) {
            if (cmp(p->key, best->key)) {
                best = p;
                prevBest = prev;
            }
            prev = p;
        }

        if (prevBest) prevBest->sibling = best->sibling;
        else head = best->sibling;

        BNode* child = best->child;
        BNode* rev = nullptr;
        while (child) {
            BNode* nxt = child->sibling;
            child->sibling = rev;
            child->parent = nullptr;
            rev = child;
            child = nxt;
        }

        int out = best->key;
        delete best;
        head = unionHeaps(head, rev);
        return out;
    }

    void merge(BinomialHeap& other) {
        head = unionHeaps(head, other.head);
        other.head = nullptr;
    }

    void printRoots() const {
        cout << (isMinHeap ? "Min" : "Max") << " Binomial roots: ";
        for (BNode* p = head; p; p = p->sibling) {
            cout << "(k=" << p->key << ",d=" << p->degree << ") ";
        }
        cout << "\\n";
    }
};

int main() {
    BinomialHeap h1(true), h2(true);
    h1.insert(10); h1.insert(3); h1.insert(18);
    h2.insert(7); h2.insert(1); h2.insert(25);

    h1.printRoots();
    h2.printRoots();

    h1.merge(h2);
    h1.printRoots();

    cout << "Peek: " << h1.peek() << "\\n";
    cout << "Extract: " << h1.extractTop() << "\\n";
    h1.printRoots();
    return 0;
}
`;

const codeHeapFibonacci = `#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
using namespace std;

struct FNode {
    int key;
    int degree;
    bool mark;
    FNode* parent;
    FNode* child;
    FNode* left;
    FNode* right;

    explicit FNode(int k)
        : key(k), degree(0), mark(false), parent(nullptr), child(nullptr), left(this), right(this) {}
};

class FibonacciHeap {
private:
    FNode* root = nullptr;
    FNode* best = nullptr;
    int n = 0;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    static void spliceRight(FNode* a, FNode* b) {
        b->left = a;
        b->right = a->right;
        a->right->left = b;
        a->right = b;
    }

    static void removeNode(FNode* x) {
        x->left->right = x->right;
        x->right->left = x->left;
        x->left = x->right = x;
    }

    void addToRootList(FNode* x) {
        x->parent = nullptr;
        x->mark = false;
        if (!root) {
            root = x;
            best = x;
            return;
        }
        spliceRight(root, x);
        if (cmp(x->key, best->key)) best = x;
    }

    void link(FNode* y, FNode* x) {
        removeNode(y);
        y->parent = x;
        if (!x->child) {
            x->child = y;
        } else {
            spliceRight(x->child, y);
        }
        x->degree++;
        y->mark = false;
    }

    void consolidate() {
        if (!root) return;

        vector<FNode*> roots;
        FNode* p = root;
        do {
            roots.push_back(p);
            p = p->right;
        } while (p != root);

        vector<FNode*> A(64, nullptr);
        for (FNode* w : roots) {
            FNode* x = w;
            int d = x->degree;
            while (A[d]) {
                FNode* y = A[d];
                if (cmp(y->key, x->key)) swap(x, y);
                link(y, x);
                A[d] = nullptr;
                d++;
            }
            A[d] = x;
        }

        root = nullptr;
        best = nullptr;
        for (FNode* x : A) {
            if (!x) continue;
            x->left = x->right = x;
            if (!root) {
                root = best = x;
            } else {
                spliceRight(root, x);
                if (cmp(x->key, best->key)) best = x;
            }
        }
    }

    void cut(FNode* x, FNode* y) {
        if (y->child == x) y->child = (x->right != x) ? x->right : nullptr;
        y->degree--;
        removeNode(x);
        addToRootList(x);
    }

    void cascadingCut(FNode* y) {
        FNode* z = y->parent;
        if (!z) return;
        if (!y->mark) {
            y->mark = true;
        } else {
            cut(y, z);
            cascadingCut(z);
        }
    }

public:
    explicit FibonacciHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    FNode* insert(int key) {
        FNode* x = new FNode(key);
        addToRootList(x);
        n++;
        return x;
    }

    int peek() const {
        if (!best) return isMinHeap ? INT_MAX : INT_MIN;
        return best->key;
    }

    int extractTop() {
        if (!best) return isMinHeap ? INT_MAX : INT_MIN;
        FNode* z = best;

        if (z->child) {
            vector<FNode*> children;
            FNode* c = z->child;
            do {
                children.push_back(c);
                c = c->right;
            } while (c != z->child);

            for (FNode* x : children) {
                removeNode(x);
                addToRootList(x);
                x->parent = nullptr;
            }
        }

        if (z->right == z) {
            root = best = nullptr;
        } else {
            if (root == z) root = z->right;
            removeNode(z);
            best = root;
            consolidate();
        }

        int out = z->key;
        delete z;
        n--;
        return out;
    }

    void decreaseOrIncreaseKey(FNode* x, int newKey) {
        if (!x) return;
        int old = x->key;
        x->key = newKey;
        FNode* y = x->parent;

        bool violates = y && cmp(x->key, y->key);
        if (violates) {
            cut(x, y);
            cascadingCut(y);
        }

        if (!best || cmp(x->key, best->key)) best = x;
        (void)old;
    }

    void erase(FNode* x) {
        if (!x) return;
        decreaseOrIncreaseKey(x, isMinHeap ? INT_MIN : INT_MAX);
        extractTop();
    }

    void merge(FibonacciHeap& other) {
        if (!other.root) return;
        if (!root) {
            root = other.root;
            best = other.best;
            n = other.n;
        } else {
            FNode* aRight = root->right;
            FNode* bLeft = other.root->left;
            root->right = other.root;
            other.root->left = root;
            aRight->left = bLeft;
            bLeft->right = aRight;
            if (cmp(other.best->key, best->key)) best = other.best;
            n += other.n;
        }
        other.root = other.best = nullptr;
        other.n = 0;
    }

    void printTop() const {
        if (!best) cout << "Heap empty\\n";
        else cout << (isMinHeap ? "Min" : "Max") << " top: " << best->key << "\\n";
    }
};

int main() {
    FibonacciHeap h(true);
    auto* a = h.insert(20);
    auto* b = h.insert(7);
    auto* c = h.insert(3);
    h.printTop();

    h.decreaseOrIncreaseKey(a, 2);
    h.printTop();

    cout << "Extract: " << h.extractTop() << "\\n";
    h.printTop();

    h.erase(c);
    h.printTop();

    FibonacciHeap other(true);
    other.insert(5);
    other.insert(1);
    h.merge(other);
    h.printTop();
    (void)b;
    return 0;
}
`;

const codeHeapLeftist = `#include <iostream>
#include <climits>
using namespace std;

struct LNode {
    int key;
    int npl;
    LNode* left;
    LNode* right;
    explicit LNode(int k) : key(k), npl(0), left(nullptr), right(nullptr) {}
};

class LeftistHeap {
private:
    LNode* root = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    static int getNpl(LNode* n) {
        return n ? n->npl : -1;
    }

    LNode* mergeNodes(LNode* a, LNode* b) {
        if (!a) return b;
        if (!b) return a;
        if (!cmp(a->key, b->key)) swap(a, b);

        a->right = mergeNodes(a->right, b);
        if (getNpl(a->left) < getNpl(a->right)) swap(a->left, a->right);
        a->npl = getNpl(a->right) + 1;
        return a;
    }

public:
    explicit LeftistHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) {
        root = mergeNodes(root, new LNode(x));
    }

    int peek() const {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        return root->key;
    }

    int extractTop() {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        int out = root->key;
        LNode* l = root->left;
        LNode* r = root->right;
        delete root;
        root = mergeNodes(l, r);
        return out;
    }

    void merge(LeftistHeap& other) {
        root = mergeNodes(root, other.root);
        other.root = nullptr;
    }

    void clearNode(LNode* n) {
        if (!n) return;
        clearNode(n->left);
        clearNode(n->right);
        delete n;
    }

    ~LeftistHeap() { clearNode(root); }

    void printPreorder(LNode* n) const {
        if (!n) return;
        cout << "(" << n->key << ",npl=" << n->npl << ") ";
        printPreorder(n->left);
        printPreorder(n->right);
    }

    void print() const {
        cout << (isMinHeap ? "Min" : "Max") << " Leftist: ";
        printPreorder(root);
        cout << "\\n";
    }
};

int main() {
    LeftistHeap h1(true), h2(true);
    h1.insert(10); h1.insert(3); h1.insert(17);
    h2.insert(8); h2.insert(1); h2.insert(6);

    h1.print();
    h2.print();

    h1.merge(h2);
    h1.print();

    cout << "Peek: " << h1.peek() << "\\n";
    cout << "Extract: " << h1.extractTop() << "\\n";
    h1.print();
    return 0;
}
`;

const codeHeapSkew = `#include <iostream>
#include <climits>
using namespace std;

struct SNode {
    int key;
    SNode* left;
    SNode* right;
    explicit SNode(int k) : key(k), left(nullptr), right(nullptr) {}
};

class SkewHeap {
private:
    SNode* root = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    SNode* mergeNodes(SNode* a, SNode* b) {
        if (!a) return b;
        if (!b) return a;
        if (!cmp(a->key, b->key)) swap(a, b);

        a->right = mergeNodes(a->right, b);
        swap(a->left, a->right);
        return a;
    }

    void clearNode(SNode* n) {
        if (!n) return;
        clearNode(n->left);
        clearNode(n->right);
        delete n;
    }

public:
    explicit SkewHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) {
        root = mergeNodes(root, new SNode(x));
    }

    int peek() const {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        return root->key;
    }

    int extractTop() {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        int out = root->key;
        SNode* l = root->left;
        SNode* r = root->right;
        delete root;
        root = mergeNodes(l, r);
        return out;
    }

    void merge(SkewHeap& other) {
        root = mergeNodes(root, other.root);
        other.root = nullptr;
    }

    ~SkewHeap() { clearNode(root); }

    void printPreorder(SNode* n) const {
        if (!n) return;
        cout << n->key << " ";
        printPreorder(n->left);
        printPreorder(n->right);
    }

    void print() const {
        cout << (isMinHeap ? "Min" : "Max") << " Skew: ";
        printPreorder(root);
        cout << "\\n";
    }
};

int main() {
    SkewHeap h1(true), h2(true);
    h1.insert(12); h1.insert(5); h1.insert(30);
    h2.insert(7); h2.insert(2); h2.insert(18);

    h1.print();
    h2.print();

    h1.merge(h2);
    h1.print();

    cout << "Peek: " << h1.peek() << "\\n";
    cout << "Extract: " << h1.extractTop() << "\\n";
    h1.print();
    return 0;
}
`;

const codeHeapDary = `#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

class DAryHeap {
private:
    vector<int> data;
    int d;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    int parent(int index) const {
        return (index - 1) / d;
    }

    int child(int index, int offset) const {
        return index * d + offset + 1;
    }

    void siftUp(int index) {
        while (index > 0) {
            int p = parent(index);
            if (!cmp(data[index], data[p])) break;
            swap(data[index], data[p]);
            index = p;
        }
    }

    void siftDown(int index) {
        while (true) {
            int best = index;
            for (int offset = 0; offset < d; ++offset) {
                int c = child(index, offset);
                if (c < static_cast<int>(data.size()) && cmp(data[c], data[best])) {
                    best = c;
                }
            }
            if (best == index) break;
            swap(data[index], data[best]);
            index = best;
        }
    }

public:
    explicit DAryHeap(int arity = 4, bool minHeap = true) : d(arity), isMinHeap(minHeap) {
        if (d < 2) throw runtime_error("Arity must be at least 2");
    }

    void insert(int value) {
        data.push_back(value);
        siftUp(static_cast<int>(data.size()) - 1);
    }

    int peek() const {
        if (data.empty()) throw runtime_error("Heap is empty");
        return data[0];
    }

    int extractTop() {
        if (data.empty()) throw runtime_error("Heap is empty");
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        if (!data.empty()) siftDown(0);
        return top;
    }

    void changeKey(int index, int newValue) {
        if (index < 0 || index >= static_cast<int>(data.size())) {
            throw runtime_error("Index out of range");
        }
        int oldValue = data[index];
        data[index] = newValue;
        if (cmp(newValue, oldValue)) siftUp(index);
        else siftDown(index);
    }

    void mergeFrom(const vector<int>& other) {
        for (int value : other) insert(value);
    }

    void print() const {
        cout << d << "-ary " << (isMinHeap ? "min" : "max") << " heap: ";
        for (int value : data) cout << value << " ";
        cout << "\\n";
    }
};

int main() {
    DAryHeap heap(4, true);
    heap.insert(20);
    heap.insert(7);
    heap.insert(3);
    heap.insert(12);
    heap.insert(1);
    heap.print();

    cout << "Peek: " << heap.peek() << "\\n";
    cout << "Extract: " << heap.extractTop() << "\\n";
    heap.changeKey(2, 2);
    heap.mergeFrom({9, 4, 15});
    heap.print();
    return 0;
}`;

const codeHeapPairing = `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct PNode {
    int key;
    PNode* child;
    PNode* sibling;
    explicit PNode(int value) : key(value), child(nullptr), sibling(nullptr) {}
};

class PairingHeap {
private:
    PNode* root = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    PNode* meld(PNode* a, PNode* b) {
        if (!a) return b;
        if (!b) return a;
        if (!cmp(a->key, b->key)) swap(a, b);
        b->sibling = a->child;
        a->child = b;
        return a;
    }

    PNode* mergePairs(PNode* node) {
        if (!node || !node->sibling) return node;
        PNode* first = node;
        PNode* second = node->sibling;
        PNode* rest = second->sibling;
        first->sibling = nullptr;
        second->sibling = nullptr;
        return meld(meld(first, second), mergePairs(rest));
    }

    void clearNode(PNode* node) {
        if (!node) return;
        clearNode(node->child);
        clearNode(node->sibling);
        delete node;
    }

public:
    explicit PairingHeap(bool minHeap = true) : isMinHeap(minHeap) {}
    ~PairingHeap() { clearNode(root); }

    void insert(int value) {
        root = meld(root, new PNode(value));
    }

    int peek() const {
        return root ? root->key : (isMinHeap ? INT_MAX : INT_MIN);
    }

    int extractTop() {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        int top = root->key;
        PNode* oldRoot = root;
        root = mergePairs(root->child);
        oldRoot->child = nullptr;
        delete oldRoot;
        return top;
    }

    void merge(PairingHeap& other) {
        root = meld(root, other.root);
        other.root = nullptr;
    }

    void printRoot() const {
        if (!root) cout << "Pairing heap empty\\n";
        else cout << (isMinHeap ? "Min" : "Max") << " pairing root: " << root->key << "\\n";
    }
};

int main() {
    PairingHeap h1(true), h2(true);
    h1.insert(12);
    h1.insert(5);
    h1.insert(30);
    h2.insert(7);
    h2.insert(2);
    h2.insert(18);

    h1.merge(h2);
    h1.printRoot();
    cout << "Extract: " << h1.extractTop() << "\\n";
    h1.printRoot();
    return 0;
}`;

const codeTreeTrie = `#include <iostream>
#include <string>
using namespace std;

class TrieNode {
public:
    TrieNode* children[26];
    bool isEndOfWord;
    TrieNode() {
        isEndOfWord = false;
        for (int i = 0; i < 26; i++) children[i] = nullptr;
    }
};

class Trie {
private:
    TrieNode* root;

public:
    Trie() { root = new TrieNode(); }

    void insert(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int index = c - 'A'; // Assuming uppercase for visualization
            if (curr->children[index] == nullptr) {
                curr->children[index] = new TrieNode();
            }
            curr = curr->children[index];
        }
        curr->isEndOfWord = true;
        cout << "Inserted word: " << word << endl;
    }

    bool search(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int index = c - 'A';
            if (curr->children[index] == nullptr) return false;
            curr = curr->children[index];
        }
        return curr->isEndOfWord;
    }
};

int main() {
    Trie trie;
    trie.insert("CAR");
    trie.insert("CAT");
    trie.insert("DOG");
    cout << "Contains CAT? " << (trie.search("CAT") ? "Yes" : "No") << endl;
    return 0;
}
`;

const codeTreeRadix = `#include <iostream>
#include <string>
#include <map>
using namespace std;

class RadixNode {
public:
    map<string, RadixNode*> edges;
    bool isEndOfWord;
    RadixNode() : isEndOfWord(false) {}
};

class RadixTree {
public:
    RadixNode* root;
    RadixTree() { root = new RadixNode(); }

    void insert(string word) {
        // Warning: Simplified implementation for presentation
        // Real Radix trees actively split existing string edges based on longest common prefix.
        RadixNode* curr = root;
        
        // Simulating the compressed prefix routing:
        if(curr->edges.find(word) == curr->edges.end()) {
            curr->edges[word] = new RadixNode();
        }
        curr->edges[word]->isEndOfWord = true;
        cout << "Inserted compressed prefix: " << word << endl;
    }
};

int main() {
    RadixTree radix;
    radix.insert("WATER");
    radix.insert("WATCH"); // In real radix, "WAT" splits from "ER" and "CH"
    return 0;
}
`;

const codeTreeTST = `#include <iostream>
#include <string>
using namespace std;

struct TSTNode {
    char data;
    bool isEndOfWord;
    TSTNode *left, *eq, *right;

    TSTNode(char data) : data(data), isEndOfWord(false), left(nullptr), eq(nullptr), right(nullptr) {}
};

class TernarySearchTree {
private:
    TSTNode* insertRecursive(TSTNode* root, const string& word, int index) {
        if (!root) root = new TSTNode(word[index]);

        if (word[index] < root->data) {
            root->left = insertRecursive(root->left, word, index);
        } else if (word[index] > root->data) {
            root->right = insertRecursive(root->right, word, index);
        } else {
            if (index + 1 < word.length()) {
                root->eq = insertRecursive(root->eq, word, index + 1);
            } else {
                root->isEndOfWord = true;
            }
        }
        return root;
    }

public:
    TSTNode* root;
    TernarySearchTree() { root = nullptr; }

    void insert(string word) {
        root = insertRecursive(root, word, 0);
        cout << "Inserted " << word << " via ternary logic." << endl;
    }
};

int main() {
    TernarySearchTree tst;
    tst.insert("CAR");
    tst.insert("CAT"); // 'T' goes > 'R' under the 'A' middle branch
    return 0;
}
`;

const codeTreeBTree = `#include <iostream>
#include <vector>
using namespace std;

class BTreeNode {
public:
    vector<int> keys;
    vector<BTreeNode*> children;
    bool leaf;
    int t; // Minimum degree (defines the range for number of keys)

    BTreeNode(int t, bool leaf) : t(t), leaf(leaf) {}

    void insertNonFull(int k) {
        int i = keys.size() - 1;
        if (leaf) {
            keys.push_back(0); // Make space
            while (i >= 0 && keys[i] > k) {
                keys[i + 1] = keys[i];
                i--;
            }
            keys[i + 1] = k;
        } else {
            while (i >= 0 && keys[i] > k) i--;
            if (children[i + 1]->keys.size() == 2 * t - 1) {
                splitChild(i + 1, children[i + 1]);
                if (keys[i + 1] < k) i++;
            }
            children[i + 1]->insertNonFull(k);
        }
    }

    void splitChild(int i, BTreeNode* y) {
        BTreeNode* z = new BTreeNode(y->t, y->leaf);
        for (int j = 0; j < t - 1; j++) z->keys.push_back(y->keys[j + t]);
        if (!y->leaf) {
            for (int j = 0; j < t; j++) z->children.push_back(y->children[j + t]);
            y->children.resize(t); // Cut children
        }
        keys.insert(keys.begin() + i, y->keys[t - 1]);
        y->keys.resize(t - 1); // Cut keys
        children.insert(children.begin() + i + 1, z);
    }
};

class BTree {
    BTreeNode* root;
    int t;
public:
    BTree(int t) : root(nullptr), t(t) {}

    void insert(int k) {
        if (!root) {
            root = new BTreeNode(t, true);
            root->keys.push_back(k);
        } else {
            if (root->keys.size() == 2 * t - 1) {
                BTreeNode* s = new BTreeNode(t, false);
                s->children.push_back(root);
                s->splitChild(0, root);
                int i = (s->keys[0] < k) ? 1 : 0;
                s->children[i]->insertNonFull(k);
                root = s;
            } else {
                root->insertNonFull(k);
            }
        }
        cout << "Inserted " << k << " into B-Tree block." << endl;
    }
};

int main() {
    BTree t(3); // Order 5 typically, max 5 children, 4 keys
    t.insert(10); t.insert(20); t.insert(5); t.insert(6); t.insert(12);
    // As it hits capacity, blocks split!
    return 0;
}
`;

const codeTreeBPlus = `#include <iostream>
#include <vector>
using namespace std;

class BPlusNode {
public:
    vector<int> keys;
    vector<BPlusNode*> children;
    BPlusNode* nextLeaf; // Critical difference: Horizontal chain
    bool isLeaf;
    int MAX;
    
    BPlusNode(int maxKeys, bool isLeaf) : MAX(maxKeys), isLeaf(isLeaf), nextLeaf(nullptr) {}
};

class BPlusTree {
    BPlusNode* root;
    int MAX;
public:
    BPlusTree(int maxKeys = 3) : root(nullptr), MAX(maxKeys) {}
    
    // Core theory of B+ Trees:
    // 1. All actual data resides strictly at the leaf level.
    // 2. Internal nodes strictly act as index routing guides.
    // 3. Leaves are chained together via \`nextLeaf\` pointer for rapid range queries.
    
    void insert(int k) {
        // Warning: Precise splitting algorithm omitted to maintain focus on structure.
        // A true B+Tree copies the median key UP when a leaf splits, 
        // but pushes the median UP when an internal routing node splits.
        if (!root) {
            root = new BPlusNode(MAX, true);
            root->keys.push_back(k);
        } else {
            cout << "Routing " << k << " to appropriate leaf block..." << endl;
            // ... descent and leaf-splitting logic ...
        }
    }
};

int main() {
    BPlusTree tree(3);
    tree.insert(10);
    tree.insert(20);
    // As sequence fills, leaf nodes expand sideways and index nodes rise up!
    return 0;
}
`;

