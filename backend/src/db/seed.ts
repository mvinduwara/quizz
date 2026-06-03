import db from './schema'

const questions = [
  { category:'networking', difficulty:'easy', text:'What does OSI stand for?', code:null, opts:JSON.stringify(['Open Systems Interconnection','Open Source Interface','Optical Signal Infrastructure','Operating System Integration']), ans:0, explanation:'OSI stands for Open Systems Interconnection, a conceptual framework describing how network protocols interact in seven standardized layers.' },
  { category:'networking', difficulty:'medium', text:'What is the default MTU for Ethernet?', code:null, opts:JSON.stringify(['512 bytes','1500 bytes','4096 bytes','9000 bytes']), ans:1, explanation:'Standard Ethernet MTU is 1500 bytes. Jumbo frames go up to 9000 bytes but need explicit configuration.' },
  { category:'cloud', difficulty:'easy', text:'What does IaaS stand for?', code:null, opts:JSON.stringify(['Internet as a Service','Infrastructure as a Service','Integration as a Service','Intelligence as a Service']), ans:1, explanation:'IaaS provides virtualized computing resources including VMs, storage, and networking over the internet.' },
  { category:'cloud', difficulty:'hard', text:'What does the CAP theorem state?', code:null, opts:JSON.stringify(['Compute/Access/Performance guarantees','Consistency, Availability, Partition tolerance — only two guaranteed simultaneously','Caching, Authentication, Protocol','None of the above']), ans:1, explanation:'CAP theorem states that during a network partition a distributed system must choose between Consistency and Availability.' },
  { category:'security', difficulty:'easy', text:'What does SSL/TLS provide?', code:null, opts:JSON.stringify(['Faster transmission','Encrypted communication over a network','Data compression','IP masking']), ans:1, explanation:'TLS provides confidentiality (encryption), integrity (MAC), and authentication (certificates) for network communication.' },
  { category:'devops', difficulty:'easy', text:'What does CI/CD stand for?', code:null, opts:JSON.stringify(['Code Integration/Code Deployment','Continuous Integration/Continuous Delivery','Cloud Infrastructure/Cloud Deployment','Compiled Interface/Code Distribution']), ans:1, explanation:'CI automates integration and testing; CD automates delivery and deployment to staging or production environments.' },
  { category:'programming', difficulty:'easy', text:'What is binary search time complexity?', code:null, opts:JSON.stringify(['O(n)','O(n²)','O(log n)','O(1)']), ans:2, explanation:'Binary search halves the search space each step, requiring at most log₂(n) comparisons.' },
  { category:'databases', difficulty:'easy', text:'What does ACID stand for?', code:null, opts:JSON.stringify(['Automated Consistent Indexed Data','Atomicity, Consistency, Isolation, Durability','Advanced Concurrent Integrated Design','Asynchronous Cache Index Database']), ans:1, explanation:'ACID properties guarantee reliable transactions: Atomicity, Consistency, Isolation, and Durability.' },
]

const existing = db.prepare('SELECT COUNT(*) as c FROM questions').get() as { c: number }
if (existing.c === 0) {
  const insert = db.prepare('INSERT INTO questions (category, difficulty, text, code, opts, ans, explanation) VALUES (@category, @difficulty, @text, @code, @opts, @ans, @explanation)')
  const insertAll = db.transaction((rows: typeof questions) => rows.forEach(r => insert.run(r)))
  insertAll(questions)
  console.log('Database seeded with', questions.length, 'questions.')
} else {
  console.log('Database already has', existing.c, 'questions — skipping seed.')
}