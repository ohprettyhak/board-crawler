import { Service } from 'typedi';

import { BuilderEngine } from '@/engines/builder-engine';
import { Engine } from '@/engines/engine-interface';

@Service()
export class EngineFactory {
  constructor(private builderEngine: BuilderEngine) {}

  getEngine(engineName: string): Engine {
    switch (engineName) {
      case 'builder':
        return this.builderEngine;
      default:
        throw new Error(`Unknown engine: ${engineName}`);
    }
  }
}
