const operation = (list1, list2, isUnion = false) =>
    list1.filter(
        (set => a => isUnion === set.has(a.userId))(new Set(list2.map(b => b.userId)))
    );

// Following functions are to be used:
const inBoth = (list1, list2) => operation(list1, list2, true),
      inFirstOnly = operation,
      inSecondOnly = (list1, list2) => inFirstOnly(list2, list1);

// Sample data
const list1 = [
    { userId: 1234, userName: 'XYZ'  }, 
    { userId: 1235, userName: 'ABC'  }, 
    { userId: 1236, userName: 'IJKL' },
    { userId: 1237, userName: 'WXYZ' }, 
    { userId: 1238, userName: 'LMNO' }
];
const list2 = [
    { userId: 1235, userName: 'ABC'  },  
    { userId: 1236, userName: 'IJKL' },
    { userId: 1252, userName: 'AAAA' }
];
  
console.log('inBoth:', inBoth(list1, list2)); 