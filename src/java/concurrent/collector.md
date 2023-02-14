---
tag: [并发容器]
---

# 并发容器

```mermaid
@startuml

!theme plain
top to bottom direction
skinparam linetype ortho

class AbstractCollection<E>
class AbstractQueue<E>
class ArrayBlockingQueue<E>
interface BlockingDeque<E> << interface >>
interface BlockingQueue<E> << interface >>
interface Collection<E> << interface >>
class DelayQueue<E>
class LinkedBlockingDeque<E>
class LinkedBlockingQueue<E>
class LinkedTransferQueue<E>
class PriorityBlockingQueue<E>
interface Queue<E> << interface >>
class SynchronousQueue<E>

AbstractCollection     -[#008200,dashed]-^  Collection            
AbstractQueue          -[#000082,plain]-^  AbstractCollection    
AbstractQueue          -[#008200,dashed]-^  Queue                 
ArrayBlockingQueue     -[#000082,plain]-^  AbstractQueue         
ArrayBlockingQueue     -[#008200,dashed]-^  BlockingQueue         
BlockingDeque          -[#008200,plain]-^  BlockingQueue         
BlockingDeque          -[#008200,plain]-^  Queue                 
BlockingQueue          -[#008200,plain]-^  Queue                 
DelayQueue             -[#000082,plain]-^  AbstractQueue         
DelayQueue             -[#008200,dashed]-^  BlockingQueue         
LinkedBlockingDeque    -[#000082,plain]-^  AbstractQueue         
LinkedBlockingDeque    -[#008200,dashed]-^  BlockingDeque         
LinkedBlockingQueue    -[#000082,plain]-^  AbstractQueue         
LinkedBlockingQueue    -[#008200,dashed]-^  BlockingQueue         
LinkedTransferQueue    -[#000082,plain]-^  AbstractQueue         
LinkedTransferQueue    -[#008200,dashed]-^  BlockingQueue         
PriorityBlockingQueue  -[#000082,plain]-^  AbstractQueue         
PriorityBlockingQueue  -[#008200,dashed]-^  BlockingQueue         
Queue                  -[#008200,plain]-^  Collection            
SynchronousQueue       -[#000082,plain]-^  AbstractQueue         
SynchronousQueue       -[#008200,dashed]-^  BlockingQueue         
@enduml

```