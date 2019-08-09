
module.exports = {
    getTableSql: function() {
        const sql = 'select st.name, st.object_id from sys.tables st';
        return sql;
    },

    // e.g. 'dbo.controls'
    getTableData: function (tableNameWithSchema) {
        const sql = `select * from ${tableNameWithSchema}`;
        return sql;
    },

    getFieldPropertiesSql: function(tableNameOnly) {
        // display field properties of given table name' 
        const sql = 'SELECT OBJECT_SCHEMA_NAME(T.[object_id],DB_ID()) AS [Schema],' +
        'T.[name] AS [table_name], AC.[name] AS [column_name],' +
        'TY.[name] AS system_data_type, AC.[max_length],' +
        'AC.[precision], AC.[scale], AC.[is_nullable], AC.[is_ansi_padded]' +
        ' FROM sys.[tables] AS T' +
        ' INNER JOIN sys.[all_columns] AC ON T.[object_id] = AC.[object_id]' +
        ' INNER JOIN sys.[types] TY ON AC.[system_type_id] = TY.[system_type_id] AND AC.[user_type_id] = TY.[user_type_id]' +
        ' WHERE T.[is_ms_shipped] = 0' +
        ` and t.name = '${tableNameOnly}' or '${tableNameOnly}' is null` +
        ' ORDER BY T.[name], AC.[column_id]';

        return sql;
    },

    getForeignKeyTableInfoSql: function(tableNameOnly) {
        const sql = 'SELECT K_Table = FK.TABLE_NAME,' +
            'FK_Column = CU.COLUMN_NAME,' +
            'PK_Table = PK.TABLE_NAME,' +
            'PK_Column = PT.COLUMN_NAME,' +
            'Constraint_Name = C.CONSTRAINT_NAME' +
            ' FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS C' +
                ' INNER JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS FK ON C.CONSTRAINT_NAME = FK.CONSTRAINT_NAME' +
                ' INNER JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS PK ON C.UNIQUE_CONSTRAINT_NAME = PK.CONSTRAINT_NAME' +
                ' INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE CU ON C.CONSTRAINT_NAME = CU.CONSTRAINT_NAME' +
                ' INNER JOIN (' +
                    'SELECT i1.TABLE_NAME, i2.COLUMN_NAME' +
                    ' FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS i1' +
                    ' INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE i2 ON i1.CONSTRAINT_NAME = i2.CONSTRAINT_NAME' +
            ' WHERE i1.CONSTRAINT_TYPE = \'PRIMARY KEY\'' +
            ') PT ON PT.TABLE_NAME = PK.TABLE_NAME' +
            ` and PK.TABLE_NAME='${tableNameOnly}'` +
            ' ORDER BY' +
            ' 1,2,3,4';
        
        return sql;
    }
}
