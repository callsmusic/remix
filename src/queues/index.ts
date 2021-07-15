export default new (class Queues {
   queues: Map<number, Array<any>> = new Map();

   push(chatId: number, item: any): number {
      const queue = this.queues.get(chatId);

      if (queue) {
         queue.push(item);
         return queue.length;
      }

      this.queues.set(chatId, [item]);
      return 1;
   }

   get(chatId: number): any {
      const queue = this.queues.get(chatId);

      if (queue) {
         return queue.shift();
      }

      return undefined;
   }

   getAll(chatId: number): Array<any> {
      const queue = this.queues.get(chatId);

      if (queue) {
         return queue;
      }

      return [];
   }

   clear(chatId: number) {
      this.queues.set(chatId, []);
   }
})();
