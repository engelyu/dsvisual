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

