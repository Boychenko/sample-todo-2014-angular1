namespace Todo.Persistence.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ItemCompleted : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Items", "Completed", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Items", "Completed");
        }
    }
}
