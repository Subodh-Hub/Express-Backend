#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1d1feb258719f6bf6ba966574961270f635641cf2651eebdd85018f33789ae06/contract';
import endContract from '../../snapshots/1d1feb258719f6bf6ba966574961270f635641cf2651eebdd85018f33789ae06/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/6ee005bbe4725d82accdea300abf819af5ba13312074ea5d97c5023c5feb218e/contract';
import startContract from '../../snapshots/6ee005bbe4725d82accdea300abf819af5ba13312074ea5d97c5023c5feb218e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createNativeEnumType({ schema: 'public', typeName: 'Role', members: ['USER', 'ADMIN'] }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('role', '"Role"', {
          notNull: true,
          default: lit('USER'),
          codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'Role' } },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
