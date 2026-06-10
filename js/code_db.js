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
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
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
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
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
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
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
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
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
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

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
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int l, int r) {
    if (l >= r)
        return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
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
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`;

const codeSortBucket = `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

void bucketSort(vector<float>& arr) {
    int n = arr.size();
    if (n <= 0)
        return;

    // 1. Create n empty buckets
    vector<vector<float>> buckets(n);

    // 2. Distribute elements into buckets based on their value
    for (int i = 0; i < n; i++) {
        // Elements are assumed to be normalized between 0.0 and 1.0!
        // For array [0.78, 0.17, 0.39, 0.26, 0.72]
        int bucketIndex = n * arr[i];
        if (bucketIndex >= n)
            bucketIndex = n - 1; // Catch edge cases
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
    int largest = i;       // Initialize largest as root
    int left = 2 * i + 1;  // Left child relative offset
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
            if (!swapped)
                break;

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
            if (!swapped)
                break;
        }

        // Mark all as sorted at the end
        for (int i = 0; i < n; i++) {
            events.push_back({i, -1, -1, "SORTED"});
        }
    }

    void print() {
        cout << "Sorted array: ";
        for (int x : arr)
            cout << x << " ";
        cout << endl;
    }
};

// Example usage
int main() {
    vector<int> data = {64, 34, 25, 12, 22, 11, 90, 88, 45, 50};
    ShakerSorter sorter(data);

    cout << "Original array: ";
    for (int x : data)
        cout << x << " ";
    cout << "\\n";

    sorter.sort();
    sorter.print();

    // Output event sequence for visualization
    cout << "\\nEvent sequence for visualization:\\n";
    for (const auto& e : sorter.events) {
        cout << e.type << " at index " << e.index;
        if (e.a >= 0)
            cout << " (swap " << e.a << " <-> " << e.b << ")";
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
        if (!node)
            return new Node(data);
        if (data < node->data)
            node->left = insert(node->left, data);
        else if (data > node->data)
            node->right = insert(node->right, data);
        return node;
    }
    void insert(int data) { root = insert(root, data); }

    void inorder(Node* node) {
        if (!node)
            return;
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
        Node* x = y->left;
        Node* T2 = x->right;
        x->right = y;
        y->left = T2;
        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;
        return x;
    }

    Node* leftRotate(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;
        y->left = x;
        x->right = T2;
        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;
        return y;
    }

public:
    Node* root = nullptr;
    Node* insert(Node* node, int key) {
        if (!node)
            return new Node(key);
        if (key < node->key)
            node->left = insert(node->left, key);
        else if (key > node->key)
            node->right = insert(node->right, key);
        else
            return node;

        node->height = 1 + max(height(node->left), height(node->right));
        int balance = getBalance(node);

        if (balance > 1 && key < node->left->key)
            return rightRotate(node);
        if (balance < -1 && key > node->right->key)
            return leftRotate(node);
        if (balance > 1 && key > node->left->key) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node->right->key) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
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
    int data;
    bool color;
    Node *left, *right, *parent;
    Node(int d) : data(d), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

class RBTree {
public:
    Node* root = nullptr;

    void rotateLeft(Node*& root, Node*& pt) {
        Node* pt_right = pt->right;
        pt->right = pt_right->left;
        if (pt->right != nullptr)
            pt->right->parent = pt;
        pt_right->parent = pt->parent;
        if (pt->parent == nullptr)
            root = pt_right;
        else if (pt == pt->parent->left)
            pt->parent->left = pt_right;
        else
            pt->parent->right = pt_right;
        pt_right->left = pt;
        pt->parent = pt_right;
    }

    void rotateRight(Node*& root, Node*& pt) {
        Node* pt_left = pt->left;
        pt->left = pt_left->right;
        if (pt->left != nullptr)
            pt->left->parent = pt;
        pt_left->parent = pt->parent;
        if (pt->parent == nullptr)
            root = pt_left;
        else if (pt == pt->parent->left)
            pt->parent->left = pt_left;
        else
            pt->parent->right = pt_left;
        pt_left->right = pt;
        pt->parent = pt_left;
    }

    void fixViolation(Node*& root, Node*& pt) {
        Node* parent_pt = nullptr;
        Node* grand_parent_pt = nullptr;
        while ((pt != root) && (pt->color != BLACK) && (pt->parent->color == RED)) {
            parent_pt = pt->parent;
            grand_parent_pt = pt->parent->parent;
            if (parent_pt == grand_parent_pt->left) {
                Node* uncle_pt = grand_parent_pt->right;
                if (uncle_pt != nullptr && uncle_pt->color == RED) {
                    grand_parent_pt->color = RED;
                    parent_pt->color = BLACK;
                    uncle_pt->color = BLACK;
                    pt = grand_parent_pt;
                } else {
                    if (pt == parent_pt->right) {
                        rotateLeft(root, parent_pt);
                        pt = parent_pt;
                        parent_pt = pt->parent;
                    }
                    rotateRight(root, grand_parent_pt);
                    swap(parent_pt->color, grand_parent_pt->color);
                    pt = parent_pt;
                }
            } else {
                Node* uncle_pt = grand_parent_pt->left;
                if ((uncle_pt != nullptr) && (uncle_pt->color == RED)) {
                    grand_parent_pt->color = RED;
                    parent_pt->color = BLACK;
                    uncle_pt->color = BLACK;
                    pt = grand_parent_pt;
                } else {
                    if (pt == parent_pt->left) {
                        rotateRight(root, parent_pt);
                        pt = parent_pt;
                        parent_pt = pt->parent;
                    }
                    rotateLeft(root, grand_parent_pt);
                    swap(parent_pt->color, grand_parent_pt->color);
                    pt = parent_pt;
                }
            }
        }
        root->color = BLACK;
    }

    void insert(int data) {
        Node* pt = new Node(data);
        if (root == nullptr) {
            root = pt;
            root->color = BLACK;
            return;
        }
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
        if (!root || root->key == key)
            return root;

        if (root->key > key) {
            if (!root->left)
                return root;
            if (root->left->key > key) {
                root->left->left = splay(root->left->left, key);
                root = rightRotate(root);
            } else if (root->left->key < key) {
                root->left->right = splay(root->left->right, key);
                if (root->left->right)
                    root->left = leftRotate(root->left);
            }
            return (root->left == nullptr) ? root : rightRotate(root);
        } else {
            if (!root->right)
                return root;
            if (root->right->key > key) {
                root->right->left = splay(root->right->left, key);
                if (root->right->left)
                    root->right = rightRotate(root->right);
            } else if (root->right->key < key) {
                root->right->right = splay(root->right->right, key);
                root = leftRotate(root);
            }
            return (root->right == nullptr) ? root : leftRotate(root);
        }
    }

    void insert(int k) {
        if (!root) {
            root = new Node(k);
            return;
        }
        root = splay(root, k);
        if (root->key == k)
            return;
        Node* n = new Node(k);
        if (root->key > k) {
            n->right = root;
            n->left = root->left;
            root->left = nullptr;
        } else {
            n->left = root;
            n->right = root->right;
            root->right = nullptr;
        }
        root = n;
    }

    void search(int k) { root = splay(root, k); }
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

const codeTreeDSU = `#include <iostream>
#include <vector>
using namespace std;

struct DSU {
    vector<int> p, r;
    DSU(int n) : p(n), r(n, 0) {
        for (int i = 0; i < n; i++)
            p[i] = i;
    }
    int find(int x) {
        return p[x] == x ? x : p[x] = find(p[x]); // path compression
    }
    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b)
            return false;
        if (r[a] < r[b])
            swap(a, b);
        p[b] = a; // union by rank
        if (r[a] == r[b])
            r[a]++;
        return true;
    }
};

int main() {
    DSU d(8);
    d.unite(0, 1);
    d.unite(2, 3);
    d.unite(4, 5);
    d.unite(6, 7);
    d.unite(0, 2); // merges {0,1} U {2,3}
    d.unite(4, 6); // merges {4,5} U {6,7}
    d.unite(0, 4); // merges all
    cout << "find(7) = " << d.find(7) << "\\n";
    cout << "rank[0] = " << d.r[d.find(0)] << "\\n";
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
    StackArray() { topIndex = -1; }

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

    bool isEmpty() { return topIndex < 0; }
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
    StackLinkedList() { topNode = nullptr; }

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

    bool isEmpty() { return topNode == nullptr; }
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

    bool isEmpty() { return count == 0; }
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
    vector<vector<int>> adjMatrix;

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

const codeGraphAdjlist = `#include <iostream>
#include <list>
#include <vector>
using namespace std;

class Graph {
    int V;
    vector<list<int>> adj;

public:
    Graph(int v) : V(v), adj(v) {}

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u); // undirected
    }

    void print() const {
        for (int i = 0; i < V; i++) {
            cout << "[" << i << "] -> ";
            for (int n : adj[i])
                cout << n << " -> ";
            cout << "null\\n";
        }
    }
};

int main() {
    Graph g(5);
    g.addEdge(0, 1);
    g.addEdge(0, 4);
    g.addEdge(1, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 3);
    g.addEdge(3, 4);
    g.print();
    return 0;
}
`;

const codeGraphBFS = `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

void bfs(const vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<bool> visited(n, false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << "Visit " << u << "\\n";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

int main() {
    vector<vector<int>> adj(5);
    adj[0] = {1, 4};
    adj[1] = {0, 2, 3, 4};
    adj[2] = {1, 3};
    adj[3] = {1, 2, 4};
    adj[4] = {0, 1, 3};
    bfs(adj, 0); // expected: 0 1 4 2 3
    return 0;
}
`;

const codeGraphDFS = `#include <iostream>
#include <stack>
#include <vector>
using namespace std;

void dfsRecursive(const vector<vector<int>>& adj, int u, vector<bool>& visited) {
    visited[u] = true;
    cout << "Visit " << u << "\\n";
    for (int v : adj[u]) {
        if (!visited[v])
            dfsRecursive(adj, v, visited);
    }
}

void dfsIterative(const vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<bool> visited(n, false);
    stack<int> s;
    s.push(start);
    while (!s.empty()) {
        int u = s.top();
        s.pop();
        if (visited[u])
            continue;
        visited[u] = true;
        cout << "Visit " << u << "\\n";
        // push in reverse so smallest neighbor is popped first
        for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it) {
            if (!visited[*it])
                s.push(*it);
        }
    }
}

int main() {
    vector<vector<int>> adj(5);
    adj[0] = {1, 4};
    adj[1] = {0, 2, 3, 4};
    adj[2] = {1, 3};
    adj[3] = {1, 2, 4};
    adj[4] = {0, 1, 3};
    vector<bool> visited(5, false);
    dfsRecursive(adj, 0, visited); // expected: 0 1 2 3 4
    return 0;
}
`;

const codeGraphTraversal = `#include <iostream>
#include <queue>
#include <stack>
#include <vector>
using namespace std;

vector<int> bfsOrder(const vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<bool> visited(n, false);
    vector<int> order;
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    return order;
}

vector<int> dfsOrder(const vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<bool> visited(n, false);
    vector<int> order;
    stack<int> s;
    s.push(start);
    while (!s.empty()) {
        int u = s.top();
        s.pop();
        if (visited[u])
            continue;
        visited[u] = true;
        order.push_back(u);
        for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it) {
            if (!visited[*it])
                s.push(*it);
        }
    }
    return order;
}

int main() {
    vector<vector<int>> adj(5);
    adj[0] = {1, 4};
    adj[1] = {0, 2, 3, 4};
    adj[2] = {1, 3};
    adj[3] = {1, 2, 4};
    adj[4] = {0, 1, 3};
    cout << "BFS from 0:";
    for (int x : bfsOrder(adj, 0))
        cout << " " << x;
    cout << "\\nDFS from 0:";
    for (int x : dfsOrder(adj, 0))
        cout << " " << x;
    cout << "\\n";
    return 0;
}
`;

const codeGraphKruskal = `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

struct Edge {
    int u, v, w;
};

struct DSU {
    vector<int> p, r;
    DSU(int n) : p(n), r(n, 0) {
        for (int i = 0; i < n; i++)
            p[i] = i;
    }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b)
            return false;
        if (r[a] < r[b])
            swap(a, b);
        p[b] = a;
        if (r[a] == r[b])
            r[a]++;
        return true;
    }
};

int main() {
    int V = 5;
    vector<Edge> edges = {{0, 1, 4}, {0, 2, 7}, {1, 2, 1}, {1, 3, 3},
                          {2, 3, 2}, {3, 4, 6}, {2, 4, 5}};

    sort(edges.begin(), edges.end(),
         [](const Edge& a, const Edge& b) { return a.w < b.w; });

    DSU dsu(V);
    vector<Edge> mst;
    int totalWeight = 0;

    for (const auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            mst.push_back(e);
            totalWeight += e.w;
            if ((int)mst.size() == V - 1)
                break;
        }
    }

    cout << "MST edges:\\n";
    for (const auto& e : mst) {
        cout << e.u << " - " << e.v << " (w=" << e.w << ")\\n";
    }
    cout << "Total weight = " << totalWeight << "\\n";
    return 0;
}
`;

const codeGraphDijkstra = `#include <iostream>
#include <limits>
#include <queue>
#include <vector>
using namespace std;

const int INF = 1e9;

int main() {
    int V = 5;
    vector<vector<pair<int, int>>> adj(V); // adjacency list: {neighbor, weight}

    // Build undirected weighted graph
    auto addEdge = [&](int u, int v, int w) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    };

    addEdge(0, 1, 4);
    addEdge(0, 2, 1);
    addEdge(1, 2, 2);
    addEdge(1, 3, 3);
    addEdge(2, 3, 1);
    addEdge(3, 4, 3);
    addEdge(2, 4, 5);

    int source = 0;
    vector<int> dist(V, INF);
    vector<bool> visited(V, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[source] = 0;
    pq.push({0, source});

    cout << "Dijkstra's Shortest Path from node " << source << ":\\n";
    cout << "======================================\\n\\n";

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (visited[u])
            continue;
        visited[u] = true;

        cout << "Processing node " << u << " (distance = " << d << ")\\n";

        for (auto [v, w] : adj[u]) {
            if (!visited[v]) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                    cout << "  Updated distance to node " << v << ": " << dist[v] << "\\n";
                }
            }
        }
        cout << "\\n";
    }

    cout << "Final shortest distances from node " << source << ":\\n";
    for (int i = 0; i < V; i++) {
        cout << "Node " << i << ": ";
        if (dist[i] == INF) {
            cout << "INF (unreachable)\\n";
        } else {
            cout << dist[i] << "\\n";
        }
    }

    return 0;
}
`;

const codeGraphTopo = `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    int V = 5;
    vector<vector<int>> adj(V);
    vector<int> inDegree(V, 0);

    // Build directed acyclic graph (DAG)
    vector<pair<int, int>> edges = {{0, 1}, {0, 2}, {1, 2}, {1, 3}, {2, 3}, {3, 4}};

    cout << "Building DAG with edges:\\n";
    for (auto [u, v] : edges) {
        cout << u << " → " << v << "\\n";
        adj[u].push_back(v);
        inDegree[v]++;
    }
    cout << "\\n";

    // Kahn's Algorithm (BFS-based topological sort)
    queue<int> q;

    cout << "In-degrees: ";
    for (int i = 0; i < V; i++) {
        cout << i << ":" << inDegree[i] << " ";
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }
    cout << "\\n\\n";

    vector<int> topoOrder;
    cout << "Processing:\\n";

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topoOrder.push_back(u);

        cout << "Visit node " << u << "\\n";

        // Reduce in-degree for all neighbors
        for (int v : adj[u]) {
            inDegree[v]--;
            cout << "  Reduce in-degree of " << v << " to " << inDegree[v] << "\\n";

            if (inDegree[v] == 0) {
                cout << "  Node " << v << " now has in-degree 0, add to queue\\n";
                q.push(v);
            }
        }
        cout << "\\n";
    }

    cout << "\\n";

    // Check for cycle
    if ((int)topoOrder.size() != V) {
        cout << "ERROR: Cycle detected in graph!\\n";
        cout << "Only " << topoOrder.size() << " nodes processed out of " << V << "\\n";
    } else {
        cout << "Topological Sort (Kahn's Algorithm):\\n";
        cout << "====================================\\n";
        for (int i = 0; i < (int)topoOrder.size(); i++) {
            cout << topoOrder[i];
            if (i < (int)topoOrder.size() - 1)
                cout << " → ";
        }
        cout << "\\n";
    }

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
        if (index < 0 || index > size || size >= capacity)
            return;
        for (int i = size; i > index; i--) {
            arr[i] = arr[i - 1]; // Shift right
        }
        arr[index] = val;
        size++;
    }

    void remove(int index) {
        if (index < 0 || index >= size)
            return;
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
        if (!temp)
            return; // Out of bounds
        newNode->next = temp->next;
        temp->next = newNode;
    }

    void remove(int index) {
        if (!head)
            return;
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
        if (!temp || !temp->next)
            return;
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
        for (int i = 0; i < TABLE_SIZE; i++)
            table[i] = nullptr;
    }

    int hashFunction(int key) { return key % TABLE_SIZE; }

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
        for (int i = 0; i < TABLE_SIZE; i++)
            table[i] = -1; // -1 indicates empty
        curr_size = 0;
    }

    int hashFunction(int key) { return key % TABLE_SIZE; }

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
            if (table[i] != -1)
                cout << "[" << i << "] --> " << table[i] << endl;
            else
                cout << "[" << i << "] --> Empty" << endl;
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
        slots[0] = -1;
        slots[1] = -1;
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

    int hashFunction(int key) { return key % NUM_BUCKETS; }

    bool insert(int key) {
        int idx = hashFunction(key);

        // Try filling primary physical bucket block
        if (table[idx].count < 2) {
            table[idx].slots[table[idx].count++] = key;
            cout << "Inserted " << key << " directly into Bucket Index " << idx << endl;
            return true;
        }
        cout << "Bucket " << idx << " is full. Probing to next bucket overflow..."
             << endl;

        // Primary bucket is full; Linear Probing to next adjacent block
        int startIdx = idx;
        idx = (idx + 1) % NUM_BUCKETS;
        while (idx != startIdx) {
            if (table[idx].count < 2) {
                table[idx].slots[table[idx].count++] = key;
                cout << "Overflow Inserted " << key << " into Bucket Index " << idx
                     << endl;
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
#include <stdexcept>
#include <vector>
using namespace std;

class BinaryHeap {
private:
    vector<int> data;
    bool isMinHeap;

    bool cmp(int a, int b) const { return isMinHeap ? (a < b) : (a > b); }

    void siftUp(int i) {
        while (i > 0) {
            int p = (i - 1) / 2;
            if (!cmp(data[i], data[p]))
                break;
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

            if (left < n && cmp(data[left], data[best]))
                best = left;
            if (right < n && cmp(data[right], data[best]))
                best = right;
            if (best == i)
                break;

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
        if (data.empty())
            throw runtime_error("Heap is empty");
        return data[0];
    }

    int extractTop() {
        if (data.empty())
            throw runtime_error("Heap is empty");
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        if (!data.empty())
            siftDown(0);
        return top;
    }

    void decreaseOrIncreaseKey(int idx, int newVal) {
        if (idx < 0 || idx >= static_cast<int>(data.size())) {
            throw runtime_error("Index out of range");
        }
        int oldVal = data[idx];
        data[idx] = newVal;
        if (cmp(newVal, oldVal))
            siftUp(idx);
        else
            siftDown(idx);
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
        for (int v : other)
            insert(v);
    }

    void printArray() const {
        cout << (isMinHeap ? "MinHeap" : "MaxHeap") << " array: ";
        for (int v : data)
            cout << v << " ";
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

const codeHeapBinomial = `#include <climits>
#include <iostream>
#include <vector>
using namespace std;

struct BNode {
    int key;
    int degree;
    BNode* parent;
    BNode* child;
    BNode* sibling;
    explicit BNode(int k)
        : key(k), degree(0), parent(nullptr), child(nullptr), sibling(nullptr) {}
};

class BinomialHeap {
private:
    BNode* head = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const { return isMinHeap ? (a < b) : (a > b); }

    BNode* mergeRootLists(BNode* h1, BNode* h2) {
        if (!h1)
            return h2;
        if (!h2)
            return h1;

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
        if (!newHead)
            return nullptr;

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
                if (!prev)
                    newHead = next;
                else
                    prev->sibling = next;
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
        if (!head)
            return isMinHeap ? INT_MAX : INT_MIN;
        BNode* best = head;
        for (BNode* p = head->sibling; p; p = p->sibling) {
            if (cmp(p->key, best->key))
                best = p;
        }
        return best->key;
    }

    int extractTop() {
        if (!head)
            return isMinHeap ? INT_MAX : INT_MIN;

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

        if (prevBest)
            prevBest->sibling = best->sibling;
        else
            head = best->sibling;

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
    h1.insert(10);
    h1.insert(3);
    h1.insert(18);
    h2.insert(7);
    h2.insert(1);
    h2.insert(25);

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

const codeHeapFibonacci = `#include <climits>
#include <iostream>
#include <unordered_map>
#include <vector>
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
        : key(k), degree(0), mark(false), parent(nullptr), child(nullptr), left(this),
          right(this) {}
};

class FibonacciHeap {
private:
    FNode* root = nullptr;
    FNode* best = nullptr;
    int n = 0;
    bool isMinHeap;

    bool cmp(int a, int b) const { return isMinHeap ? (a < b) : (a > b); }

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
        if (cmp(x->key, best->key))
            best = x;
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
        if (!root)
            return;

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
                if (cmp(y->key, x->key))
                    swap(x, y);
                link(y, x);
                A[d] = nullptr;
                d++;
            }
            A[d] = x;
        }

        root = nullptr;
        best = nullptr;
        for (FNode* x : A) {
            if (!x)
                continue;
            x->left = x->right = x;
            if (!root) {
                root = best = x;
            } else {
                spliceRight(root, x);
                if (cmp(x->key, best->key))
                    best = x;
            }
        }
    }

    void cut(FNode* x, FNode* y) {
        if (y->child == x)
            y->child = (x->right != x) ? x->right : nullptr;
        y->degree--;
        removeNode(x);
        addToRootList(x);
    }

    void cascadingCut(FNode* y) {
        FNode* z = y->parent;
        if (!z)
            return;
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
        if (!best)
            return isMinHeap ? INT_MAX : INT_MIN;
        return best->key;
    }

    int extractTop() {
        if (!best)
            return isMinHeap ? INT_MAX : INT_MIN;
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
            if (root == z)
                root = z->right;
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
        if (!x)
            return;
        int old = x->key;
        x->key = newKey;
        FNode* y = x->parent;

        bool violates = y && cmp(x->key, y->key);
        if (violates) {
            cut(x, y);
            cascadingCut(y);
        }

        if (!best || cmp(x->key, best->key))
            best = x;
        (void)old;
    }

    void erase(FNode* x) {
        if (!x)
            return;
        decreaseOrIncreaseKey(x, isMinHeap ? INT_MIN : INT_MAX);
        extractTop();
    }

    void merge(FibonacciHeap& other) {
        if (!other.root)
            return;
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
            if (cmp(other.best->key, best->key))
                best = other.best;
            n += other.n;
        }
        other.root = other.best = nullptr;
        other.n = 0;
    }

    void printTop() const {
        if (!best)
            cout << "Heap empty\\n";
        else
            cout << (isMinHeap ? "Min" : "Max") << " top: " << best->key << "\\n";
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

const codeHeapLeftist = `#include <climits>
#include <iostream>
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

    bool cmp(int a, int b) const { return isMinHeap ? (a < b) : (a > b); }

    static int getNpl(LNode* n) { return n ? n->npl : -1; }

    LNode* mergeNodes(LNode* a, LNode* b) {
        if (!a)
            return b;
        if (!b)
            return a;
        if (!cmp(a->key, b->key))
            swap(a, b);

        a->right = mergeNodes(a->right, b);
        if (getNpl(a->left) < getNpl(a->right))
            swap(a->left, a->right);
        a->npl = getNpl(a->right) + 1;
        return a;
    }

public:
    explicit LeftistHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) { root = mergeNodes(root, new LNode(x)); }

    int peek() const {
        if (!root)
            return isMinHeap ? INT_MAX : INT_MIN;
        return root->key;
    }

    int extractTop() {
        if (!root)
            return isMinHeap ? INT_MAX : INT_MIN;
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
        if (!n)
            return;
        clearNode(n->left);
        clearNode(n->right);
        delete n;
    }

    ~LeftistHeap() { clearNode(root); }

    void printPreorder(LNode* n) const {
        if (!n)
            return;
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
    h1.insert(10);
    h1.insert(3);
    h1.insert(17);
    h2.insert(8);
    h2.insert(1);
    h2.insert(6);

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

const codeHeapSkew = `#include <climits>
#include <iostream>
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

    bool cmp(int a, int b) const { return isMinHeap ? (a < b) : (a > b); }

    SNode* mergeNodes(SNode* a, SNode* b) {
        if (!a)
            return b;
        if (!b)
            return a;
        if (!cmp(a->key, b->key))
            swap(a, b);

        a->right = mergeNodes(a->right, b);
        swap(a->left, a->right);
        return a;
    }

    void clearNode(SNode* n) {
        if (!n)
            return;
        clearNode(n->left);
        clearNode(n->right);
        delete n;
    }

public:
    explicit SkewHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) { root = mergeNodes(root, new SNode(x)); }

    int peek() const {
        if (!root)
            return isMinHeap ? INT_MAX : INT_MIN;
        return root->key;
    }

    int extractTop() {
        if (!root)
            return isMinHeap ? INT_MAX : INT_MIN;
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
        if (!n)
            return;
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
    h1.insert(12);
    h1.insert(5);
    h1.insert(30);
    h2.insert(7);
    h2.insert(2);
    h2.insert(18);

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
#include <stdexcept>
#include <vector>
using namespace std;

class DAryHeap {
private:
    vector<int> data;
    int d;
    bool isMinHeap;

    bool cmp(int a, int b) const { return isMinHeap ? (a < b) : (a > b); }

    int parent(int index) const { return (index - 1) / d; }

    int child(int index, int offset) const { return index * d + offset + 1; }

    void siftUp(int index) {
        while (index > 0) {
            int p = parent(index);
            if (!cmp(data[index], data[p]))
                break;
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
            if (best == index)
                break;
            swap(data[index], data[best]);
            index = best;
        }
    }

public:
    explicit DAryHeap(int arity = 4, bool minHeap = true) : d(arity), isMinHeap(minHeap) {
        if (d < 2)
            throw runtime_error("Arity must be at least 2");
    }

    void insert(int value) {
        data.push_back(value);
        siftUp(static_cast<int>(data.size()) - 1);
    }

    int peek() const {
        if (data.empty())
            throw runtime_error("Heap is empty");
        return data[0];
    }

    int extractTop() {
        if (data.empty())
            throw runtime_error("Heap is empty");
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        if (!data.empty())
            siftDown(0);
        return top;
    }

    void changeKey(int index, int newValue) {
        if (index < 0 || index >= static_cast<int>(data.size())) {
            throw runtime_error("Index out of range");
        }
        int oldValue = data[index];
        data[index] = newValue;
        if (cmp(newValue, oldValue))
            siftUp(index);
        else
            siftDown(index);
    }

    void mergeFrom(const vector<int>& other) {
        for (int value : other)
            insert(value);
    }

    void print() const {
        cout << d << "-ary " << (isMinHeap ? "min" : "max") << " heap: ";
        for (int value : data)
            cout << value << " ";
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

const codeHeapPairing = `#include <climits>
#include <iostream>
#include <vector>
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

    bool cmp(int a, int b) const { return isMinHeap ? (a < b) : (a > b); }

    PNode* meld(PNode* a, PNode* b) {
        if (!a)
            return b;
        if (!b)
            return a;
        if (!cmp(a->key, b->key))
            swap(a, b);
        b->sibling = a->child;
        a->child = b;
        return a;
    }

    PNode* mergePairs(PNode* node) {
        if (!node || !node->sibling)
            return node;
        PNode* first = node;
        PNode* second = node->sibling;
        PNode* rest = second->sibling;
        first->sibling = nullptr;
        second->sibling = nullptr;
        return meld(meld(first, second), mergePairs(rest));
    }

    void clearNode(PNode* node) {
        if (!node)
            return;
        clearNode(node->child);
        clearNode(node->sibling);
        delete node;
    }

public:
    explicit PairingHeap(bool minHeap = true) : isMinHeap(minHeap) {}
    ~PairingHeap() { clearNode(root); }

    void insert(int value) { root = meld(root, new PNode(value)); }

    int peek() const { return root ? root->key : (isMinHeap ? INT_MAX : INT_MIN); }

    int extractTop() {
        if (!root)
            return isMinHeap ? INT_MAX : INT_MIN;
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
        if (!root)
            cout << "Pairing heap empty\\n";
        else
            cout << (isMinHeap ? "Min" : "Max") << " pairing root: " << root->key << "\\n";
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
        for (int i = 0; i < 26; i++)
            children[i] = nullptr;
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
            if (curr->children[index] == nullptr)
                return false;
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
#include <map>
#include <string>
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
        // Real Radix trees actively split existing string edges based on longest common
        // prefix.
        RadixNode* curr = root;

        // Simulating the compressed prefix routing:
        if (curr->edges.find(word) == curr->edges.end()) {
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

    TSTNode(char data)
        : data(data), isEndOfWord(false), left(nullptr), eq(nullptr), right(nullptr) {}
};

class TernarySearchTree {
private:
    TSTNode* insertRecursive(TSTNode* root, const string& word, int index) {
        if (!root)
            root = new TSTNode(word[index]);

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
            while (i >= 0 && keys[i] > k)
                i--;
            if (children[i + 1]->keys.size() == 2 * t - 1) {
                splitChild(i + 1, children[i + 1]);
                if (keys[i + 1] < k)
                    i++;
            }
            children[i + 1]->insertNonFull(k);
        }
    }

    void splitChild(int i, BTreeNode* y) {
        BTreeNode* z = new BTreeNode(y->t, y->leaf);
        for (int j = 0; j < t - 1; j++)
            z->keys.push_back(y->keys[j + t]);
        if (!y->leaf) {
            for (int j = 0; j < t; j++)
                z->children.push_back(y->children[j + t]);
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
    t.insert(10);
    t.insert(20);
    t.insert(5);
    t.insert(6);
    t.insert(12);
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

    BPlusNode(int maxKeys, bool isLeaf)
        : MAX(maxKeys), isLeaf(isLeaf), nextLeaf(nullptr) {}
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

const codeOOPInheritance = `#include <iostream>
using namespace std;

class Animal {
public:
    Animal() { cout << "Animal constructor" << endl; }
    virtual ~Animal() { cout << "Animal destructor" << endl; }

    virtual void speak() { cout << "Animal sound" << endl; }
};

class Dog : public Animal {
public:
    Dog() { cout << "Dog constructor" << endl; }
    ~Dog() override { cout << "Dog destructor" << endl; }

    void speak() override { cout << "Woof" << endl; }
};

class Cat : public Animal {
public:
    Cat() { cout << "Cat constructor" << endl; }
    ~Cat() override { cout << "Cat destructor" << endl; }

    void speak() override { cout << "Meow" << endl; }
};

int main() {
    Animal* animals[2];
    animals[0] = new Dog();
    animals[1] = new Cat();

    for (int i = 0; i < 2; i++) {
        animals[i]->speak();
        delete animals[i];
    }

    return 0;
}
`;

const codeOOPPolymorphism = `#include <iostream>
#include <vector>
using namespace std;

class Shape {
public:
    virtual ~Shape() {}

    virtual void draw() const = 0;
    virtual double area() const = 0;
};

class Circle : public Shape {
private:
    double radius;

public:
    explicit Circle(double r) : radius(r) {}

    void draw() const override { cout << "Drawing Circle(" << radius << ")" << endl; }

    double area() const override { return 3.14159 * radius * radius; }
};

class Rectangle : public Shape {
private:
    double width;
    double height;

public:
    Rectangle(double w, double h) : width(w), height(h) {}

    void draw() const override {
        cout << "Drawing Rectangle(" << width << ", " << height << ")" << endl;
    }

    double area() const override { return width * height; }
};

int main() {
    vector<Shape*> shapes;
    shapes.push_back(new Circle(5.0));
    shapes.push_back(new Rectangle(4.0, 6.0));

    for (const auto* shape : shapes) {
        shape->draw();
        cout << "Area: " << shape->area() << endl;
    }

    for (auto* shape : shapes) {
        delete shape;
    }

    return 0;
}
`;

const codeOOPEncapsulation = `#include <iostream>
#include <mutex>
using namespace std;

class BankAccount {
public:
    explicit BankAccount(double initialBalance) : balance(initialBalance) {}

    void deposit(double amount) {
        lock_guard<mutex> guard(accountLock);
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: " << amount << endl;
        }
    }

    bool withdraw(double amount) {
        lock_guard<mutex> guard(accountLock);
        if (canWithdraw(amount)) {
            balance -= amount;
            log("withdraw", amount);
            return true;
        }
        return false;
    }

    double getBalance() const { return balance; }

protected:
    bool canWithdraw(double amount) const { return amount > 0 && amount <= balance; }

private:
    void log(const string& type, double amount) const {
        cout << "Log: " << type << " " << amount << endl;
    }

    double balance;
    mutable mutex accountLock;
};

int main() {
    BankAccount account(1000.0);

    account.deposit(200.0);
    if (account.withdraw(150.0)) {
        cout << "Withdraw success" << endl;
    }

    cout << "Final balance: " << account.getBalance() << endl;
    return 0;
}
`;

const codeOOPAbstraction = `#include <iostream>
#include <vector>
using namespace std;

// Abstract base class — a pure-virtual class is C++'s "interface".
class Shape {
public:
    virtual double area() const = 0; // pure virtual -> Shape is abstract
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;

public:
    Circle(double radius) : r(radius) {}
    double area() const override { return 3.14159 * r * r; }
};

class Rectangle : public Shape {
    double w, h;

public:
    Rectangle(double width, double height) : w(width), h(height) {}
    double area() const override { return w * h; }
};

int main() {
    // Shape s;   // compile error: cannot instantiate an abstract class
    vector<Shape*> shapes = {new Circle(2.0), new Rectangle(3.0, 4.0)};
    for (Shape* s : shapes) {
        cout << "area = " << s->area() << endl;
        delete s;
    }
    return 0;
}
`;

const codeOOPAdhoc = `#include <iostream>
#include <string>
using namespace std;

// Function overloading: same name, different parameter types.
void print(int x) { cout << "int: " << x << endl; }
void print(double x) { cout << "double: " << x << endl; }
void print(const string& x) { cout << "string: " << x << endl; }

// Operator overloading.
struct Vector2D {
    double x, y;
    Vector2D operator+(const Vector2D& o) const { return Vector2D{x + o.x, y + o.y}; }
};

int main() {
    print(42);           // resolves to print(int)
    print(3.14);         // resolves to print(double)
    print(string("hi")); // resolves to print(const string&)

    Vector2D a{1, 2}, b{3, 4};
    Vector2D c = a + b; // operator+
    cout << "sum: (" << c.x << ", " << c.y << ")" << endl;
    return 0;
}
`;

const codeOOPTemplates = `#include <iostream>
#include <string>
using namespace std;

// Function template.
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class template.
template <typename T>
class Box {
    T value;

public:
    Box(T v) : value(v) {}
    T get() const { return value; }
    void set(T v) { value = v; }
};

int main() {
    cout << maximum(3, 7) << endl;                            // T = int
    cout << maximum(2.5, 1.5) << endl;                        // T = double
    cout << maximum(string("apple"), string("pear")) << endl; // T = string

    Box<int> bi(42);
    Box<string> bs("hello");
    cout << bi.get() << " " << bs.get() << endl;
    return 0;
}
`;

const codePatternSingleton = `#include <iostream>
#include <mutex>
using namespace std;

class Singleton {
private:
    static Singleton* m_instance;
    static mutex m_mutex;
    int m_value;

    // Private constructor - prevents external instantiation
    Singleton() : m_value(0) { cout << "Singleton constructor called" << endl; }

public:
    // Prevent copying
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

    // Get singleton instance with thread-safe lazy initialization
    static Singleton* getInstance() {
        lock_guard<mutex> lock(m_mutex);
        if (m_instance == nullptr) {
            m_instance = new Singleton();
            cout << "Created new Singleton instance" << endl;
        } else {
            cout << "Returning existing Singleton instance" << endl;
        }
        return m_instance;
    }

    void setValue(int val) { m_value = val; }

    int getValue() const { return m_value; }

    ~Singleton() { cout << "Singleton destructor called" << endl; }
};

// Static member initialization
Singleton* Singleton::m_instance = nullptr;
mutex Singleton::m_mutex;

int main() {
    Singleton* s1 = Singleton::getInstance();
    s1->setValue(42);
    cout << "s1 value: " << s1->getValue() << endl;

    Singleton* s2 = Singleton::getInstance();
    cout << "s2 value: " << s2->getValue() << endl;

    cout << "Same object: " << (s1 == s2 ? "YES" : "NO") << endl;

    return 0;
}
`;

const codePatternFactory = `#include <iostream>
#include <memory>
using namespace std;

// Abstract Product
class Vehicle {
public:
    virtual ~Vehicle() {}
    virtual void display() const = 0;
};

// Concrete Products
class Car : public Vehicle {
public:
    void display() const override { cout << "[Car] 4 wheels, sedan, engine: V6" << endl; }
};

class Truck : public Vehicle {
public:
    void display() const override {
        cout << "[Truck] 4 wheels, cargo bed, engine: Diesel" << endl;
    }
};

class Bike : public Vehicle {
public:
    void display() const override {
        cout << "[Bike] 2 wheels, lightweight, engine: Gasoline" << endl;
    }
};

// Factory Method
class VehicleFactory {
public:
    static unique_ptr<Vehicle> createVehicle(const string& type) {
        if (type == "car")
            return make_unique<Car>();
        else if (type == "truck")
            return make_unique<Truck>();
        else if (type == "bike")
            return make_unique<Bike>();
        return nullptr;
    }
};

int main() {
    // Client code doesn't know concrete classes, only uses factory
    unique_ptr<Vehicle> v1 = VehicleFactory::createVehicle("car");
    unique_ptr<Vehicle> v2 = VehicleFactory::createVehicle("truck");
    unique_ptr<Vehicle> v3 = VehicleFactory::createVehicle("bike");

    if (v1)
        v1->display();
    if (v2)
        v2->display();
    if (v3)
        v3->display();

    return 0;
}
`;

const codePatternAdapter = `#include <iostream>
using namespace std;

// Existing/Legacy system with incompatible interface
class LegacyDataSource {
public:
    string getDataLegacy() const { return "Legacy: Raw Binary Data [0x1A, 0x2B, 0x3C]"; }
};

// Target interface that modern code expects
class ModernDataInterface {
public:
    virtual ~ModernDataInterface() {}
    virtual string fetch() = 0;
    virtual string getFormat() = 0;
};

// Adapter: Bridges the gap
class LegacyAdapter : public ModernDataInterface {
private:
    LegacyDataSource m_legacy;

public:
    string fetch() override {
        // Adapt legacy method call to modern interface
        return "Adapted: " + m_legacy.getDataLegacy();
    }

    string getFormat() override { return "Binary Format Adapted to JSON"; }
};

int main() {
    // Modern code expects ModernDataInterface
    unique_ptr<ModernDataInterface> adapter = make_unique<LegacyAdapter>();

    cout << "Fetching data: " << adapter->fetch() << endl;
    cout << "Format: " << adapter->getFormat() << endl;

    // Adapter allows using legacy system with modern code without modification
    return 0;
}
`;

const codePatternDecorator = `#include <iostream>
#include <memory>
using namespace std;

// Component interface
class Coffee {
public:
    virtual ~Coffee() {}
    virtual string getDescription() const = 0;
    virtual double getCost() const = 0;
};

// Concrete Component
class SimpleCoffee : public Coffee {
public:
    string getDescription() const override { return "Simple Coffee"; }

    double getCost() const override { return 2.00; }
};

// Decorator base class
class CoffeeDecorator : public Coffee {
protected:
    shared_ptr<Coffee> m_coffee;

public:
    CoffeeDecorator(shared_ptr<Coffee> coffee) : m_coffee(coffee) {}
};

// Concrete Decorators
class MilkDecorator : public CoffeeDecorator {
public:
    MilkDecorator(shared_ptr<Coffee> coffee) : CoffeeDecorator(coffee) {}

    string getDescription() const override {
        return m_coffee->getDescription() + " + Milk";
    }

    double getCost() const override { return m_coffee->getCost() + 0.50; }
};

class SugarDecorator : public CoffeeDecorator {
public:
    SugarDecorator(shared_ptr<Coffee> coffee) : CoffeeDecorator(coffee) {}

    string getDescription() const override {
        return m_coffee->getDescription() + " + Sugar";
    }

    double getCost() const override { return m_coffee->getCost() + 0.25; }
};

class WhippedCreamDecorator : public CoffeeDecorator {
public:
    WhippedCreamDecorator(shared_ptr<Coffee> coffee) : CoffeeDecorator(coffee) {}

    string getDescription() const override {
        return m_coffee->getDescription() + " + Whipped Cream";
    }

    double getCost() const override { return m_coffee->getCost() + 0.75; }
};

int main() {
    // Create base coffee
    shared_ptr<Coffee> coffee = make_shared<SimpleCoffee>();
    cout << coffee->getDescription() << " => \$" << coffee->getCost() << endl;

    // Decorate with milk
    coffee = make_shared<MilkDecorator>(coffee);
    cout << coffee->getDescription() << " => \$" << coffee->getCost() << endl;

    // Add sugar
    coffee = make_shared<SugarDecorator>(coffee);
    cout << coffee->getDescription() << " => \$" << coffee->getCost() << endl;

    // Add whipped cream
    coffee = make_shared<WhippedCreamDecorator>(coffee);
    cout << coffee->getDescription() << " => \$" << coffee->getCost() << endl;

    return 0;
}
`;

const codePatternObserver = `#include <iostream>
#include <memory>
#include <vector>
using namespace std;

// Observer interface
class Observer {
public:
    virtual ~Observer() {}
    virtual void update(const string& message) = 0;
};

// Subject
class Subject {
private:
    vector<shared_ptr<Observer>> m_observers;
    string m_state;

public:
    void attach(shared_ptr<Observer> observer) { m_observers.push_back(observer); }

    void detach(shared_ptr<Observer> observer) {
        // Remove observer from list (implementation omitted for brevity)
    }

    void setState(const string& state) {
        m_state = state;
        notify();
    }

    string getState() const { return m_state; }

private:
    void notify() {
        cout << "Subject state changed to: " << m_state << endl;
        for (auto observer : m_observers) {
            observer->update(m_state);
        }
    }
};

// Concrete Observers
class ConcreteObserverA : public Observer {
public:
    void update(const string& message) override {
        cout << "ObserverA received update: " << message << endl;
    }
};

class ConcreteObserverB : public Observer {
public:
    void update(const string& message) override {
        cout << "ObserverB received update: " << message << endl;
    }
};

class ConcreteObserverC : public Observer {
public:
    void update(const string& message) override {
        cout << "ObserverC received update: " << message << endl;
    }
};

int main() {
    auto subject = make_shared<Subject>();

    auto obs_a = make_shared<ConcreteObserverA>();
    auto obs_b = make_shared<ConcreteObserverB>();
    auto obs_c = make_shared<ConcreteObserverC>();

    subject->attach(obs_a);
    subject->attach(obs_b);
    subject->attach(obs_c);

    cout << "--- Setting state to 'Event1' ---" << endl;
    subject->setState("Event1");

    cout << "\\n--- Setting state to 'Event2' ---" << endl;
    subject->setState("Event2");

    return 0;
}
`;

const codePatternStrategy = `#include <iostream>
#include <memory>
using namespace std;

// Strategy interface
class PaymentStrategy {
public:
    virtual ~PaymentStrategy() {}
    virtual void pay(double amount) const = 0;
};

// Concrete Strategies
class CreditCardPayment : public PaymentStrategy {
private:
    string m_cardNumber;

public:
    CreditCardPayment(const string& cardNumber) : m_cardNumber(cardNumber) {}

    void pay(double amount) const override {
        cout << "Processing credit card payment: \$" << amount << " with card "
             << m_cardNumber.substr(m_cardNumber.length() - 4) << endl;
    }
};

class CryptoCurrencyPayment : public PaymentStrategy {
private:
    string m_walletAddress;

public:
    CryptoCurrencyPayment(const string& walletAddr) : m_walletAddress(walletAddr) {}

    void pay(double amount) const override {
        cout << "Processing cryptocurrency payment: " << amount << " BTC to wallet "
             << m_walletAddress.substr(0, 8) << "..." << endl;
    }
};

class PayPalPayment : public PaymentStrategy {
private:
    string m_email;

public:
    PayPalPayment(const string& email) : m_email(email) {}

    void pay(double amount) const override {
        cout << "Processing PayPal payment: \$" << amount << " from " << m_email << endl;
    }
};

// Context
class PaymentProcessor {
private:
    shared_ptr<PaymentStrategy> m_strategy;

public:
    void setStrategy(shared_ptr<PaymentStrategy> strategy) { m_strategy = strategy; }

    void processPayment(double amount) {
        if (m_strategy) {
            m_strategy->pay(amount);
        } else {
            cout << "No payment strategy set!" << endl;
        }
    }
};

int main() {
    PaymentProcessor processor;

    // Strategy 1: Credit Card
    cout << "--- Using Credit Card ---" << endl;
    auto cc = make_shared<CreditCardPayment>("1234567890123456");
    processor.setStrategy(cc);
    processor.processPayment(99.99);

    // Strategy 2: Cryptocurrency
    cout << "\\n--- Using Cryptocurrency ---" << endl;
    auto crypto =
        make_shared<CryptoCurrencyPayment>("1A1z7agoat2wtQW6wvV8x4L3yzH2Xkq68R");
    processor.setStrategy(crypto);
    processor.processPayment(0.005);

    // Strategy 3: PayPal
    cout << "\\n--- Using PayPal ---" << endl;
    auto paypal = make_shared<PayPalPayment>("user@example.com");
    processor.setStrategy(paypal);
    processor.processPayment(50.00);

    return 0;
}
`;

const codePatternMVC = `#include <iostream>
#include <string>
using namespace std;

// Model — owns the data.
class Model {
    string data;

public:
    void setData(const string& d) { data = d; }
    string getData() const { return data; }
};

// View — renders the model.
class View {
public:
    void render(const Model& m) { cout << "[View] " << m.getData() << endl; }
};

// Controller — handles input, updates the model, refreshes the view.
class Controller {
    Model& model;
    View& view;

public:
    Controller(Model& m, View& v) : model(m), view(v) {}
    void handleInput(const string& input) {
        model.setData(input);
        view.render(model);
    }
};

int main() {
    Model model;
    View view;
    Controller controller(model, view);
    controller.handleInput("Hello, MVC");   // [View] Hello, MVC
    controller.handleInput("Updated text"); // [View] Updated text
    return 0;
}
`;

const codePatternLayered = `#include <iostream>
#include <string>
using namespace std;

// Data layer — lowest layer, returns raw data.
class DataLayer {
public:
    string fetch() { return "raw record"; }
};

// Business layer — applies rules; calls only the layer below.
class BusinessLayer {
    DataLayer data;

public:
    string process() { return "[validated] " + data.fetch(); }
};

// Presentation layer — formats output; calls only the layer below.
class PresentationLayer {
    BusinessLayer business;

public:
    void show() { cout << "Display: " << business.process() << endl; }
};

int main() {
    PresentationLayer ui;
    ui.show(); // Display: [validated] raw record
    return 0;
}
`;

const codePatternPubSub = `#include <functional>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Event bus — decouples publishers from subscribers.
class EventBus {
    vector<function<void(const string&)>> subscribers;

public:
    void subscribe(function<void(const string&)> handler) {
        subscribers.push_back(handler);
    }
    void publish(const string& event) {
        for (auto& handler : subscribers)
            handler(event);
    }
};

int main() {
    EventBus bus;
    // Two subscribers — neither knows the publisher or each other.
    bus.subscribe([](const string& e) { cout << "Subscriber A got: " << e << endl; });
    bus.subscribe([](const string& e) { cout << "Subscriber B got: " << e << endl; });
    // Publisher emits through the bus.
    bus.publish("user.signed_in");
    return 0;
}
`;

const codePatternPipeFilter = `#include <algorithm>
#include <cctype>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Filter — one transformation stage.
class Filter {
public:
    virtual string process(const string& input) const = 0;
    virtual ~Filter() {}
};

class TrimFilter : public Filter {
public:
    string process(const string& s) const override {
        size_t a = s.find_first_not_of(' ');
        size_t b = s.find_last_not_of(' ');
        return (a == string::npos) ? "" : s.substr(a, b - a + 1);
    }
};

class UpperFilter : public Filter {
public:
    string process(const string& s) const override {
        string r = s;
        transform(r.begin(), r.end(), r.begin(), ::toupper);
        return r;
    }
};

class ExclaimFilter : public Filter {
public:
    string process(const string& s) const override { return s + "!"; }
};

// Pipeline — chains filters; data flows through each pipe.
class Pipeline {
    vector<Filter*> filters;

public:
    void add(Filter* f) { filters.push_back(f); }
    string run(const string& input) const {
        string data = input;
        for (Filter* f : filters)
            data = f->process(data);
        return data;
    }
};

int main() {
    TrimFilter trim;
    UpperFilter upper;
    ExclaimFilter exclaim;
    Pipeline pipeline;
    pipeline.add(&trim);
    pipeline.add(&upper);
    pipeline.add(&exclaim);
    cout << pipeline.run("  hello  ") << endl; // HELLO!
    return 0;
}
`;

const codePatternDI = `#include <iostream>
#include <string>
using namespace std;

// Service — an abstraction the consumer depends on.
class Service {
public:
    virtual string fetch() const = 0;
    virtual ~Service() {}
};

// A concrete implementation.
class ConsoleService : public Service {
public:
    string fetch() const override { return "data from ConsoleService"; }
};

// Consumer — receives its dependency; never constructs it.
class Consumer {
    Service& service; // depends on the abstraction
public:
    Consumer(Service& s) : service(s) {} // constructor injection
    void run() { cout << "Consumer used: " << service.fetch() << endl; }
};

int main() {
    // Composition root — wires concrete implementations to abstractions.
    ConsoleService service;
    Consumer consumer(service); // dependency injected, not hard-coded
    consumer.run();
    return 0;
}
`;

const codeDeque = `#include <iostream>
using namespace std;

struct Node {
    int val;
    Node* prev;
    Node* next;
    Node(int v) : val(v), prev(nullptr), next(nullptr) {}
};

class Deque {
private:
    Node* head;
    Node* tail;
    int count;

public:
    Deque() : head(nullptr), tail(nullptr), count(0) {}

    void pushFront(int v) {
        Node* node = new Node(v);
        if (!head) {
            head = tail = node;
        } else {
            node->next = head;
            head->prev = node;
            head = node;
        }
        count++;
    }

    void pushBack(int v) {
        Node* node = new Node(v);
        if (!tail) {
            head = tail = node;
        } else {
            node->prev = tail;
            tail->next = node;
            tail = node;
        }
        count++;
    }

    int popFront() {
        if (!head) {
            cout << "Deque is empty" << endl;
            return -1;
        }
        Node* node = head;
        int v = node->val;
        head = head->next;
        if (head)
            head->prev = nullptr;
        else
            tail = nullptr;
        delete node;
        count--;
        return v;
    }

    int popBack() {
        if (!tail) {
            cout << "Deque is empty" << endl;
            return -1;
        }
        Node* node = tail;
        int v = node->val;
        tail = tail->prev;
        if (tail)
            tail->next = nullptr;
        else
            head = nullptr;
        delete node;
        count--;
        return v;
    }

    void print() {
        cout << "null <-> ";
        for (Node* p = head; p; p = p->next)
            cout << p->val << " <-> ";
        cout << "null" << endl;
    }
};

int main() {
    Deque dq;
    dq.pushBack(10);
    dq.pushBack(20);
    dq.pushFront(5);
    dq.print(); // null <-> 5 <-> 10 <-> 20 <-> null
    dq.popBack();
    dq.popFront();
    dq.print(); // null <-> 10 <-> null
    return 0;
}
`;

const codeSearchKMP = `#include <iostream>
#include <string>
#include <vector>
using namespace std;

vector<int> computeLPS(const string& pat) {
    int m = pat.size();
    vector<int> lps(m, 0);
    int len = 0;
    for (int i = 1; i < m;) {
        if (pat[i] == pat[len]) {
            lps[i++] = ++len;
        } else if (len != 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

void kmpSearch(const string& text, const string& pat) {
    int n = text.size(), m = pat.size();
    vector<int> lps = computeLPS(pat);
    int i = 0, j = 0;
    while (i < n) {
        if (text[i] == pat[j]) {
            i++;
            j++;
            if (j == m) {
                cout << "Match at index " << (i - j) << endl;
                j = lps[j - 1];
            }
        } else if (j != 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    kmpSearch(text, pattern); // Match at index 10
    return 0;
}
`;

const codeSearchBM = `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int ALPHABET = 256;

vector<int> buildBadChar(const string& pat) {
    vector<int> badChar(ALPHABET, -1);
    for (int i = 0; i < (int)pat.size(); i++)
        badChar[(unsigned char)pat[i]] = i;
    return badChar;
}

// Strong good-suffix preprocessing: fills shift[] of size m+1.
void buildGoodSuffix(const string& pat, vector<int>& shift) {
    int m = pat.size();
    vector<int> bpos(m + 1, 0);
    shift.assign(m + 1, 0);
    int i = m, j = m + 1;
    bpos[i] = j;
    while (i > 0) {
        while (j <= m && pat[i - 1] != pat[j - 1]) {
            if (shift[j] == 0)
                shift[j] = j - i;
            j = bpos[j];
        }
        i--;
        j--;
        bpos[i] = j;
    }
    j = bpos[0];
    for (i = 0; i <= m; i++) {
        if (shift[i] == 0)
            shift[i] = j;
        if (i == j)
            j = bpos[j];
    }
}

void boyerMooreSearch(const string& text, const string& pat) {
    int n = text.size(), m = pat.size();
    vector<int> badChar = buildBadChar(pat);
    vector<int> shift;
    buildGoodSuffix(pat, shift);
    int s = 0;
    while (s <= n - m) {
        int j = m - 1;
        while (j >= 0 && pat[j] == text[s + j])
            j--;
        if (j < 0) {
            cout << "Match at index " << s << endl;
            s += shift[0];
        } else {
            int bcShift = j - badChar[(unsigned char)text[s + j]];
            s += max(shift[j + 1], max(1, bcShift));
        }
    }
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    boyerMooreSearch(text, pattern); // Match at index 10
    return 0;
}
`;

const codeSearchRK = `#include <iostream>
#include <string>
using namespace std;

const int BASE = 256;
const int MOD = 101;

void rabinKarpSearch(const string& text, const string& pat) {
    int n = text.size(), m = pat.size();
    if (m > n)
        return;
    int patHash = 0, winHash = 0, h = 1;
    for (int i = 0; i < m - 1; i++)
        h = (h * BASE) % MOD;
    for (int i = 0; i < m; i++) {
        patHash = (BASE * patHash + pat[i]) % MOD;
        winHash = (BASE * winHash + text[i]) % MOD;
    }
    for (int s = 0; s <= n - m; s++) {
        if (patHash == winHash) {
            int j = 0;
            while (j < m && text[s + j] == pat[j])
                j++;
            if (j == m)
                cout << "Match at index " << s << endl;
        }
        if (s < n - m) {
            winHash = (BASE * (winHash - text[s] * h) + text[s + m]) % MOD;
            if (winHash < 0)
                winHash += MOD;
        }
    }
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    rabinKarpSearch(text, pattern); // Match at index 10
    return 0;
}
`;

const codeSearchStrCompare = `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Each function returns the number of character/hash comparisons performed.

int kmpCompares(const string& text, const string& pat) {
    int n = text.size(), m = pat.size(), cmp = 0;
    vector<int> lps(m, 0);
    for (int len = 0, i = 1; i < m;) {
        if (pat[i] == pat[len])
            lps[i++] = ++len;
        else if (len)
            len = lps[len - 1];
        else
            lps[i++] = 0;
    }
    int i = 0, j = 0;
    while (i < n) {
        cmp++;
        if (text[i] == pat[j]) {
            i++;
            j++;
            if (j == m)
                j = lps[j - 1];
        } else if (j)
            j = lps[j - 1];
        else
            i++;
    }
    return cmp;
}

// Trimmed Boyer-Moore (bad-character heuristic only).
int bmCompares(const string& text, const string& pat) {
    int n = text.size(), m = pat.size(), cmp = 0;
    vector<int> bad(256, -1);
    for (int i = 0; i < m; i++)
        bad[(unsigned char)pat[i]] = i;
    int s = 0;
    while (s <= n - m) {
        int j = m - 1;
        while (j >= 0) {
            cmp++;
            if (pat[j] != text[s + j])
                break;
            j--;
        }
        if (j < 0)
            s += 1;
        else
            s += max(1, j - bad[(unsigned char)text[s + j]]);
    }
    return cmp;
}

int rkCompares(const string& text, const string& pat) {
    const int BASE = 256, MOD = 101;
    int n = text.size(), m = pat.size(), cmp = 0;
    if (m > n)
        return 0;
    int ph = 0, wh = 0, h = 1;
    for (int i = 0; i < m - 1; i++)
        h = (h * BASE) % MOD;
    for (int i = 0; i < m; i++) {
        ph = (BASE * ph + pat[i]) % MOD;
        wh = (BASE * wh + text[i]) % MOD;
    }
    for (int s = 0; s <= n - m; s++) {
        cmp++; // one hash comparison per window
        if (ph == wh) {
            int j = 0;
            while (j < m && text[s + j] == pat[j]) {
                cmp++;
                j++;
            }
        }
        if (s < n - m) {
            wh = (BASE * (wh - text[s] * h) + text[s + m]) % MOD;
            if (wh < 0)
                wh += MOD;
        }
    }
    return cmp;
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    cout << "KMP comparisons: " << kmpCompares(text, pattern) << endl;
    cout << "BM  comparisons: " << bmCompares(text, pattern) << endl;
    cout << "RK  comparisons: " << rkCompares(text, pattern) << endl;
    return 0;
}
`;

const codeBloomFilter = `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// A Bloom filter: a space-efficient probabilistic set. A query may report a
// false positive ("possibly present") but never a false negative.
class BloomFilter {
    static const int SIZE = 32;
    vector<bool> bits;

    int hash1(const string& s) const {
        unsigned long h = 5381;
        for (char c : s)
            h = h * 33 + static_cast<unsigned char>(c);
        return static_cast<int>(h % SIZE);
    }
    int hash2(const string& s) const {
        unsigned long h = 0;
        for (char c : s)
            h = h * 31 + static_cast<unsigned char>(c);
        return static_cast<int>(h % SIZE);
    }
    int hash3(const string& s) const {
        unsigned long h = 7;
        for (char c : s)
            h = h * 17 + static_cast<unsigned char>(c) + 1;
        return static_cast<int>(h % SIZE);
    }

public:
    BloomFilter() : bits(SIZE, false) {}

    void insert(const string& key) {
        bits[hash1(key)] = true;
        bits[hash2(key)] = true;
        bits[hash3(key)] = true;
    }

    bool possiblyContains(const string& key) const {
        return bits[hash1(key)] && bits[hash2(key)] && bits[hash3(key)];
    }
};

int main() {
    BloomFilter bf;
    bf.insert("cat");
    bf.insert("dog");
    bf.insert("bird");

    // "dog" was inserted, so this is always true.
    cout << "contains dog?  " << bf.possiblyContains("dog") << "\\n";
    // "fish" was never inserted: 0 means definitely absent, 1 a false positive.
    cout << "contains fish? " << bf.possiblyContains("fish") << "\\n";
    return 0;
}
`;

const codeSkipList = `#include <cstdlib>
#include <iostream>
#include <vector>
using namespace std;

// A skip list: an ordered map built from a multi-level linked list. Each node
// is promoted to a random number of express lanes, giving expected O(log n).
struct Node {
    int key;
    vector<Node*> forward;
    Node(int k, int level) : key(k), forward(level + 1, nullptr) {}
};

class SkipList {
    static const int MAX_LEVEL = 3; // levels 0..3
    Node* head;
    int level;

    int randomLevel() {
        int lvl = 0;
        while ((rand() & 1) && lvl < MAX_LEVEL)
            lvl++;
        return lvl;
    }

public:
    SkipList() : level(0) { head = new Node(-1, MAX_LEVEL); }

    void insert(int key) {
        vector<Node*> update(MAX_LEVEL + 1, head);
        Node* cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
            update[i] = cur;
        }
        int lvl = randomLevel();
        if (lvl > level) {
            for (int i = level + 1; i <= lvl; i++)
                update[i] = head;
            level = lvl;
        }
        Node* node = new Node(key, lvl);
        for (int i = 0; i <= lvl; i++) {
            node->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = node;
        }
    }

    bool search(int key) {
        Node* cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
        }
        cur = cur->forward[0];
        return cur && cur->key == key;
    }

    void remove(int key) {
        vector<Node*> update(MAX_LEVEL + 1, head);
        Node* cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
            update[i] = cur;
        }
        cur = cur->forward[0];
        if (!cur || cur->key != key)
            return;
        for (int i = 0; i <= level; i++) {
            if (update[i]->forward[i] != cur)
                break;
            update[i]->forward[i] = cur->forward[i];
        }
        delete cur;
        while (level > 0 && !head->forward[level])
            level--;
    }
};

int main() {
    SkipList sl;
    int keys[] = {3, 7, 12, 19, 25};
    for (int k : keys)
        sl.insert(k);

    cout << "search 12? " << sl.search(12) << "\\n"; // 1
    cout << "search 20? " << sl.search(20) << "\\n"; // 0
    sl.remove(12);
    cout << "search 12 after remove? " << sl.search(12) << "\\n"; // 0
    return 0;
}
`;

const codeCountMinSketch = `#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

// A Count-Min Sketch: a probabilistic frequency table. estimate() never
// underestimates a count; hash collisions may inflate it.
class CountMinSketch {
    static const int DEPTH = 3;
    static const int WIDTH = 8;
    int table[DEPTH][WIDTH];

    int hash(int row, const string& s) const {
        unsigned long h = static_cast<unsigned long>(row + 1) * 2654435761UL;
        for (char c : s)
            h = h * 31 + static_cast<unsigned char>(c);
        return static_cast<int>(h % WIDTH);
    }

public:
    CountMinSketch() {
        for (int r = 0; r < DEPTH; r++)
            for (int c = 0; c < WIDTH; c++)
                table[r][c] = 0;
    }

    void update(const string& key) {
        for (int r = 0; r < DEPTH; r++)
            table[r][hash(r, key)]++;
    }

    int estimate(const string& key) const {
        int est = table[0][hash(0, key)];
        for (int r = 1; r < DEPTH; r++)
            est = min(est, table[r][hash(r, key)]);
        return est;
    }
};

int main() {
    CountMinSketch cms;
    for (int i = 0; i < 5; i++)
        cms.update("apple");
    for (int i = 0; i < 2; i++)
        cms.update("banana");
    cms.update("cherry");

    cout << "apple  ~ " << cms.estimate("apple") << "\\n";  // >= 5
    cout << "banana ~ " << cms.estimate("banana") << "\\n"; // >= 2
    cout << "grape  ~ " << cms.estimate("grape") << "\\n";  // >= 0
    return 0;
}
`;

const codeSearchZAlgo = `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// The Z-array: Z[i] is the length of the longest substring starting at i that
// matches a prefix of the string. Built in linear time with a [l, r] window.
vector<int> computeZ(const string& s) {
    int n = static_cast<int>(s.size());
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r)
            z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]])
            z[i]++;
        if (i + z[i] > r) {
            l = i;
            r = i + z[i];
        }
    }
    return z;
}

// String matching: build pattern + '\$' + text; an index whose Z-value equals
// the pattern length marks an occurrence; assumes '\$' appears in neither the
// pattern nor the text.
vector<int> zSearch(const string& text, const string& pattern) {
    string combined = pattern + "\$" + text;
    vector<int> z = computeZ(combined);
    vector<int> matches;
    int m = static_cast<int>(pattern.size());
    for (int i = 0; i < static_cast<int>(combined.size()); i++) {
        if (z[i] == m)
            matches.push_back(i - m - 1); // translate back into text
    }
    return matches;
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    vector<int> matches = zSearch(text, pattern);

    cout << "matches at:";
    for (int idx : matches)
        cout << " " << idx;
    cout << "\\n"; // matches at index 10
    return 0;
}
`;

const codeSearchAho = `#include <iostream>
#include <map>
#include <queue>
#include <string>
#include <vector>
using namespace std;

// Aho-Corasick: a trie of all patterns plus BFS-computed failure links, so a
// single text scan reports every occurrence of every pattern.
struct Node {
    map<char, Node*> children;
    Node* fail = nullptr;
    vector<int> output;
};

class AhoCorasick {
    Node* root;
    vector<string> patterns;

public:
    AhoCorasick() { root = new Node(); }

    void addPattern(const string& p) {
        int idx = static_cast<int>(patterns.size());
        patterns.push_back(p);
        Node* cur = root;
        for (char c : p) {
            if (!cur->children.count(c))
                cur->children[c] = new Node();
            cur = cur->children[c];
        }
        cur->output.push_back(idx);
    }

    void build() {
        queue<Node*> q;
        root->fail = root;
        for (auto& kv : root->children) {
            kv.second->fail = root;
            q.push(kv.second);
        }
        while (!q.empty()) {
            Node* cur = q.front();
            q.pop();
            for (auto& kv : cur->children) {
                char c = kv.first;
                Node* child = kv.second;
                Node* f = cur->fail;
                while (f != root && !f->children.count(c))
                    f = f->fail;
                if (f->children.count(c) && f->children[c] != child)
                    child->fail = f->children[c];
                else
                    child->fail = root;
                for (int idx : child->fail->output)
                    child->output.push_back(idx);
                q.push(child);
            }
        }
    }

    void search(const string& text) {
        Node* cur = root;
        for (int i = 0; i < static_cast<int>(text.size()); i++) {
            char c = text[i];
            while (cur != root && !cur->children.count(c))
                cur = cur->fail;
            if (cur->children.count(c))
                cur = cur->children[c];
            for (int idx : cur->output) {
                int start = i - static_cast<int>(patterns[idx].size()) + 1;
                cout << "match \\"" << patterns[idx] << "\\" at " << start << "\\n";
            }
        }
    }
};

int main() {
    AhoCorasick ac;
    ac.addPattern("he");
    ac.addPattern("she");
    ac.addPattern("his");
    ac.addPattern("hers");
    ac.build();
    ac.search("ushers"); // she@1, he@2, hers@2
    return 0;
}
`;

const codeTreeSegment = `#include <iostream>
#include <vector>
using namespace std;

// A segment tree over an array, aggregating range sums, with lazy
// propagation so a whole range can be updated in O(log n).
class SegmentTree {
    int n;
    vector<long long> tree, lazy;

    void build(const vector<int>& a, int node, int lo, int hi) {
        if (lo == hi) {
            tree[node] = a[lo];
            return;
        }
        int mid = (lo + hi) / 2;
        build(a, 2 * node, lo, mid);
        build(a, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    void applyLazy(int node, int lo, int hi, long long val) {
        tree[node] += (long long)(hi - lo + 1) * val;
        lazy[node] += val;
    }
    void pushDown(int node, int lo, int hi) {
        if (lazy[node] == 0)
            return;
        int mid = (lo + hi) / 2;
        applyLazy(2 * node, lo, mid, lazy[node]);
        applyLazy(2 * node + 1, mid + 1, hi, lazy[node]);
        lazy[node] = 0;
    }
    void update(int node, int lo, int hi, int ql, int qr, long long val) {
        if (qr < lo || hi < ql)
            return;
        if (ql <= lo && hi <= qr) {
            applyLazy(node, lo, hi, val);
            return;
        }
        pushDown(node, lo, hi);
        int mid = (lo + hi) / 2;
        update(2 * node, lo, mid, ql, qr, val);
        update(2 * node + 1, mid + 1, hi, ql, qr, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    long long query(int node, int lo, int hi, int ql, int qr) {
        if (qr < lo || hi < ql)
            return 0;
        if (ql <= lo && hi <= qr)
            return tree[node];
        pushDown(node, lo, hi);
        int mid = (lo + hi) / 2;
        return query(2 * node, lo, mid, ql, qr) +
               query(2 * node + 1, mid + 1, hi, ql, qr);
    }

public:
    SegmentTree(const vector<int>& a) {
        n = a.size();
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
        build(a, 1, 0, n - 1);
    }
    void rangeUpdate(int l, int r, long long val) { update(1, 0, n - 1, l, r, val); }
    long long rangeQuery(int l, int r) { return query(1, 0, n - 1, l, r); }
};

int main() {
    vector<int> a = {5, 8, 6, 3, 2, 7, 2, 6};
    SegmentTree st(a);
    cout << "sum[2,5] = " << st.rangeQuery(2, 5) << "\\n"; // 18
    st.rangeUpdate(1, 4, 3);
    cout << "after +3 on [1,4], sum[2,5] = " << st.rangeQuery(2, 5) << "\\n"; // 27
    return 0;
}
`;

const codeTreeFenwick = `#include <iostream>
#include <vector>
using namespace std;

// A Fenwick tree (Binary Indexed Tree), 1-indexed. The expression
// i & -i isolates the lowest set bit, which is the span each slot covers.
class FenwickTree {
    int n;
    vector<long long> bit;

public:
    FenwickTree(const vector<int>& a) {
        n = a.size();
        bit.assign(n + 1, 0);
        for (int i = 0; i < n; i++)
            update(i + 1, a[i]);
    }
    // add delta at 1-indexed position i, walking up via i += i & -i
    void update(int i, long long delta) {
        for (; i <= n; i += i & -i)
            bit[i] += delta;
    }
    // sum of [1, i], walking down via i -= i & -i
    long long prefixSum(int i) {
        long long s = 0;
        for (; i > 0; i -= i & -i)
            s += bit[i];
        return s;
    }
    long long rangeSum(int l, int r) { return prefixSum(r) - prefixSum(l - 1); }
};

int main() {
    vector<int> a = {3, 2, 5, 1, 7, 4, 6, 2};
    FenwickTree ft(a);
    cout << "prefixSum(7) = " << ft.prefixSum(7) << "\\n"; // 28
    ft.update(3, 5);
    cout << "after +5 at index 3, prefixSum(7) = " << ft.prefixSum(7) << "\\n"; // 33
    return 0;
}
`;

const codeTreeTraversal = `#include <iostream>
#include <stack>
#include <queue>
struct Node { int val; Node* left; Node* right; Node(int v):val(v),left(nullptr),right(nullptr){} };

void inorderRecursive(Node* n) {
    if (!n) return;
    inorderRecursive(n->left);
    std::cout << n->val << ' ';
    inorderRecursive(n->right);
}

void inorderIterative(Node* root) {
    std::stack<Node*> st; Node* cur = root;
    while (cur || !st.empty()) {
        while (cur) { st.push(cur); cur = cur->left; }
        cur = st.top(); st.pop();
        std::cout << cur->val << ' ';
        cur = cur->right;
    }
}

void levelOrder(Node* root) {
    if (!root) return;
    std::queue<Node*> q; q.push(root);
    while (!q.empty()) {
        Node* n = q.front(); q.pop();
        std::cout << n->val << ' ';
        if (n->left) q.push(n->left);
        if (n->right) q.push(n->right);
    }
}
`;

const codeHuffman = `#include <queue>
#include <vector>
#include <string>
#include <unordered_map>
struct HNode { int freq; char sym; HNode* l; HNode* r;
    HNode(int f, char s):freq(f),sym(s),l(nullptr),r(nullptr){} };
struct Cmp { bool operator()(HNode* a, HNode* b){ return a->freq > b->freq; } };

HNode* buildHuffman(const std::unordered_map<char,int>& freq) {
    std::priority_queue<HNode*, std::vector<HNode*>, Cmp> pq;
    for (auto& kv : freq) pq.push(new HNode(kv.second, kv.first));
    while (pq.size() > 1) {
        HNode* a = pq.top(); pq.pop();
        HNode* b = pq.top(); pq.pop();
        HNode* m = new HNode(a->freq + b->freq, '\\0');
        m->l = a; m->r = b;
        pq.push(m);
    }
    return pq.empty() ? nullptr : pq.top();
}

void assignCodes(HNode* n, std::string p, std::unordered_map<char,std::string>& out) {
    if (!n) return;
    if (!n->l && !n->r) { out[n->sym] = p.empty() ? "0" : p; return; }
    assignCodes(n->l, p + "0", out);
    assignCodes(n->r, p + "1", out);
}
`;

const codeExprInfixPostfix = `#include <stack>
#include <string>
#include <cctype>
#include <iostream>

int prec(char op) { return (op == '*' || op == '/') ? 2 : 1; }

// Dijkstra's shunting-yard: infix -> postfix (single-letter operands / digits).
std::string infixToPostfix(const std::string& s) {
    std::stack<char> ops;
    std::string out;
    for (char c : s) {
        if (std::isspace((unsigned char)c)) continue;
        if (std::isalnum((unsigned char)c)) { out += c; out += ' '; }
        else if (c == '(') ops.push(c);
        else if (c == ')') {
            while (!ops.empty() && ops.top() != '(') { out += ops.top(); out += ' '; ops.pop(); }
            if (!ops.empty()) ops.pop(); // discard '('
        } else { // operator
            while (!ops.empty() && ops.top() != '(' && prec(ops.top()) >= prec(c)) { out += ops.top(); out += ' '; ops.pop(); }
            ops.push(c);
        }
    }
    while (!ops.empty()) { out += ops.top(); out += ' '; ops.pop(); }
    return out;
}

// Evaluate a postfix expression of single-digit numbers.
int evalPostfix(const std::string& tokens) {
    std::stack<int> st;
    for (char c : tokens) {
        if (std::isspace((unsigned char)c)) continue;
        if (std::isdigit((unsigned char)c)) st.push(c - '0');
        else {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (c == '+') st.push(a + b);
            else if (c == '-') st.push(a - b);
            else if (c == '*') st.push(a * b);
            else st.push(a / b);
        }
    }
    return st.top();
}
`;

const codeGraphAoe = `#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

// AOE network: forward pass (earliest), backward pass (latest), critical activities.
struct Edge { int u, v, w; };

void criticalPath(int n, const std::vector<Edge>& edges) {
    std::vector<std::vector<std::pair<int,int>>> out(n + 1), in(n + 1);
    std::vector<int> indeg(n + 1, 0);
    for (const auto& e : edges) { out[e.u].push_back({e.v, e.w}); in[e.v].push_back({e.u, e.w}); indeg[e.v]++; }

    // Topological order (Kahn).
    std::vector<int> order;
    std::queue<int> q;
    for (int i = 1; i <= n; i++) if (indeg[i] == 0) q.push(i);
    std::vector<int> deg = indeg;
    while (!q.empty()) {
        int u = q.front(); q.pop(); order.push_back(u);
        for (auto [v, w] : out[u]) if (--deg[v] == 0) q.push(v);
    }

    std::vector<int> ee(n + 1, 0), le(n + 1, 0);
    for (int u : order) for (auto [p, w] : in[u]) ee[u] = std::max(ee[u], ee[p] + w);
    int sink = order.back();
    for (int i = 1; i <= n; i++) le[i] = ee[sink];
    for (auto it = order.rbegin(); it != order.rend(); ++it) {
        int u = *it;
        for (auto [v, w] : out[u]) le[u] = std::min(le[u], le[v] - w);
    }
    // Activity (u,v,w) is critical when ee[u] == le[v] - w.
    (void)le;
}
`;

const codeGraphPrim = `#include <climits>
#include <iostream>
#include <vector>
using namespace std;

// Prim's algorithm grows a minimum spanning tree one vertex at a time,
// always adding the cheapest edge that crosses out of the current tree.
int main() {
    const int V = 5;
    // adjacency matrix of an undirected weighted graph (0 = no edge)
    int w[V][V] = {
        {0, 2, 0, 6, 0}, {2, 0, 3, 8, 5}, {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9}, {0, 5, 7, 9, 0},
    };
    vector<bool> inMST(V, false);
    vector<int> key(V, INT_MAX), parent(V, -1);
    key[0] = 0;

    for (int count = 0; count < V; count++) {
        int u = -1;
        for (int v = 0; v < V; v++)
            if (!inMST[v] && (u == -1 || key[v] < key[u]))
                u = v;
        inMST[u] = true;
        for (int v = 0; v < V; v++)
            if (w[u][v] && !inMST[v] && w[u][v] < key[v]) {
                key[v] = w[u][v];
                parent[v] = u;
            }
    }

    int total = 0;
    for (int v = 1; v < V; v++) {
        cout << "edge " << parent[v] << "-" << v << " weight " << key[v] << "\\n";
        total += key[v];
    }
    cout << "MST total weight = " << total << "\\n"; // 16
    return 0;
}
`;

const codeGraphBellmanFord = `#include <climits>
#include <iostream>
#include <vector>
using namespace std;

// Bellman-Ford computes single-source shortest paths and tolerates
// negative edge weights, unlike Dijkstra. After V-1 relaxation passes
// the distances are final; one more pass that can still relax an edge
// proves the graph contains a negative cycle.
struct Edge {
    int u, v, w;
};

int main() {
    const int V = 5;
    // directed weighted edges, including a negative weight; no negative cycle
    vector<Edge> edges = {
        {0, 1, 6},  {0, 2, 7}, {1, 2, 8},  {1, 3, 5}, {1, 4, -4},
        {2, 3, -3}, {2, 4, 9}, {3, 1, -2}, {4, 0, 2}, {4, 3, 7},
    };
    vector<int> dist(V, INT_MAX);
    dist[0] = 0;

    for (int pass = 1; pass <= V - 1; pass++) {
        for (const Edge& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])
                dist[e.v] = dist[e.u] + e.w;
        }
    }

    // a V-th pass that can still relax an edge proves a negative cycle
    bool hasNegativeCycle = false;
    for (const Edge& e : edges) {
        if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])
            hasNegativeCycle = true;
    }

    for (int v = 0; v < V; v++)
        cout << "dist[" << v << "] = " << dist[v] << "\\n";
    cout << "negative cycle: " << (hasNegativeCycle ? "yes" : "no") << "\\n";
    return 0;
}
`;

const codeGraphFloydWarshall = `#include <iostream>
using namespace std;

// Floyd-Warshall computes all-pairs shortest paths by letting each
// vertex k in turn serve as an intermediate point on every path.
int main() {
    const int V = 4;
    const int INF = 1000000;
    // directed weighted adjacency matrix; INF means no direct edge
    int dist[V][V] = {
        {0, 3, INF, 7},
        {8, 0, 2, INF},
        {5, INF, 0, 1},
        {2, INF, INF, 0},
    };

    for (int k = 0; k < V; k++)
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];

    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++)
            cout << dist[i][j] << "\\t";
        cout << "\\n";
    }
    return 0;
}
`;

const codeTreeObst = `#include <vector>
#include <limits>

// Optimal Binary Search Tree via dynamic programming.
// keys sorted ascending; freq[i] = access frequency of keys[i].
// cost[i][j] = min weighted path length for the subrange keys[i..j].
int optimalBST(const std::vector<int>& freq) {
    int n = (int)freq.size();
    std::vector<std::vector<int>> cost(n, std::vector<int>(n, 0));
    std::vector<std::vector<int>> w(n, std::vector<int>(n, 0));
    for (int i = 0; i < n; i++) { cost[i][i] = freq[i]; w[i][i] = freq[i]; }
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            w[i][j] = w[i][j - 1] + freq[j];
            cost[i][j] = std::numeric_limits<int>::max();
            for (int r = i; r <= j; r++) {
                int left = (r > i) ? cost[i][r - 1] : 0;
                int right = (r < j) ? cost[r + 1][j] : 0;
                int c = left + right + w[i][j];
                if (c < cost[i][j]) cost[i][j] = c;
            }
        }
    }
    return n ? cost[0][n - 1] : 0;
}
`;

const codeSortExternal = `#include <vector>
#include <queue>
#include <algorithm>

// External merge sort (in-memory model): generate sorted runs of size M,
// then k-way merge them with a min-heap (a practical stand-in for a
// selection/loser tree).
std::vector<int> externalSort(std::vector<int> data, int M) {
    std::vector<std::vector<int>> runs;
    for (size_t i = 0; i < data.size(); i += M) {
        std::vector<int> run(data.begin() + i, data.begin() + std::min(data.size(), i + (size_t)M));
        std::sort(run.begin(), run.end());
        runs.push_back(run);
    }
    using Item = std::tuple<int, int, int>;
    std::priority_queue<Item, std::vector<Item>, std::greater<Item>> pq;
    for (int r = 0; r < (int)runs.size(); r++) if (!runs[r].empty()) pq.push({runs[r][0], r, 0});

    std::vector<int> out;
    while (!pq.empty()) {
        auto [val, r, pos] = pq.top(); pq.pop();
        out.push_back(val);
        if (pos + 1 < (int)runs[r].size()) pq.push({runs[r][pos + 1], r, pos + 1});
    }
    return out;
}
`;

const codeMatrixSparse = `#include <vector>

// Sparse matrix as (row, col, value) triples, then FAST_TRANSPOSE in O(cols + terms).
struct Triple { int r, c, v; };

std::vector<Triple> fastTranspose(const std::vector<Triple>& a, int rows, int cols) {
    std::vector<Triple> b(a.size());
    std::vector<int> rowSize(cols, 0), startPos(cols, 0);
    for (const auto& t : a) rowSize[t.c]++;
    for (int c = 1; c < cols; c++) startPos[c] = startPos[c - 1] + rowSize[c - 1];
    for (const auto& t : a) {
        int dst = startPos[t.c]++;
        b[dst] = { t.c, t.r, t.v };
    }
    (void)rows;
    return b;
}
`;

const codePolyPadd = `#include <vector>

// Polynomial addition by merging two exponent-descending term lists.
struct Term { int coef, exp; };

std::vector<Term> padd(const std::vector<Term>& A, const std::vector<Term>& B) {
    std::vector<Term> C;
    size_t i = 0, j = 0;
    while (i < A.size() && j < B.size()) {
        if (A[i].exp > B[j].exp) C.push_back(A[i++]);
        else if (A[i].exp < B[j].exp) C.push_back(B[j++]);
        else {
            int sum = A[i].coef + B[j].coef;
            if (sum != 0) C.push_back({ sum, A[i].exp });
            i++; j++;
        }
    }
    while (i < A.size()) C.push_back(A[i++]);
    while (j < B.size()) C.push_back(B[j++]);
    return C;
}
`;

